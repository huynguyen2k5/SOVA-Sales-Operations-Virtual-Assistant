import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Users,
  UserPlus,
  Activity,
  Calendar,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { useSovaData } from "../data/SovaDataContext";
import {
  PageHeader,
  Card,
  StatusBadge,
  CUSTOMER_STATUS_MAP,
  TICKET_STATUS_MAP,
} from "../components/Layout";
import { formatDate } from "../lib/utils";
import type { User, Page } from "../types";

const CHART_TOOLTIP_STYLE = {
  background: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  fontSize: 12,
  color: "#111827",
};

interface Props {
  user: User;
  navigate: (page: Page, id?: string) => void;
}

export default function DashboardPage({ user, navigate }: Props) {
  const {
    customers,
    tickets,
    overview,
    trend,
    productInterests,
    isLoading: loading,
    error,
    refresh,
  } = useSovaData();
  const dateRange = new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  const kpiCards = [
    {
      label: "Tổng khách hàng",
      value: overview?.totalCustomers ?? 0,
      delta: "Trong phạm vi truy cập",
      positive: true,
      icon: <Users size={18} />,
      accent: "#4F46E5",
    },
    {
      label: "Khách hàng mới",
      value: overview?.newCustomers ?? 0,
      delta: "Trong kỳ hiện tại",
      positive: true,
      icon: <UserPlus size={18} />,
      accent: "#4F46E5",
    },
    {
      label: "Đang hoạt động",
      value: overview?.activeCustomers ?? 0,
      delta: "Khách hàng active",
      positive: true,
      icon: <Activity size={18} />,
      accent: "#16A34A",
    },
    {
      label: "Tổng tương tác",
      value: overview?.interactions ?? 0,
      delta: "Trong kỳ hiện tại",
      positive: true,
      icon: <TrendingUp size={18} />,
      accent: "#2563EB",
    },
    {
      label: "Cần theo dõi",
      value: overview?.followUpsDue ?? 0,
      delta: "Đang đến hạn",
      positive: false,
      icon: <AlertCircle size={18} />,
      accent: "#B45309",
    },
    {
      label: "Tỷ lệ theo dõi",
      value:
        overview?.followUpRate == null
          ? "—"
          : `${Math.round(overview.followUpRate * 100)}%`,
      delta: "Theo dữ liệu tương tác",
      positive: true,
      icon: <Calendar size={18} />,
      accent: "#C0392B",
    },
  ];

  const myCustomers =
    user.role === "staff"
      ? customers.filter((c) => c.ownerId === user.id).slice(0, 4)
      : customers.slice(0, 4);

  const recentTickets = tickets
    .filter((t) => t.status === "open" || t.status === "in_progress")
    .slice(0, 3);

  if (error) {
    return (
      <div className="p-6">
        <PageHeader title="Tổng quan vận hành" />
        <div className="flex flex-col items-center justify-center py-20">
          <AlertCircle
            size={32}
            style={{ color: "#DC2626" }}
            className="mb-3"
          />
          <p className="text-sm font-medium mb-4" style={{ color: "#374151" }}>
            Không thể tải dữ liệu. Vui lòng thử lại.
          </p>
          <button
            onClick={() => void refresh()}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded"
            style={{ background: "#4F46E5", color: "#fff", borderRadius: 6 }}
          >
            <RefreshCw size={14} /> Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl">
      <PageHeader
        title="Tổng quan vận hành"
        description={`Dữ liệu cập nhật: ${dateRange} · ${
          user.role === "staff"
            ? "Phạm vi: khách hàng được phân công"
            : "Phạm vi: toàn bộ hệ thống"
        }`}
      />

      {/* KPI Cards */}
      <div
        className="grid gap-4 mb-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {kpiCards.map((kpi) => (
          <Card key={kpi.label} style={{ padding: "20px 20px 16px" }}>
            {loading ? (
              <div>
                <div
                  className="skeleton-animate h-3 w-24 rounded mb-3"
                  style={{ background: "#E5E7EB" }}
                />
                <div
                  className="skeleton-animate h-8 w-16 rounded mb-2"
                  style={{ background: "#E5E7EB" }}
                />
                <div
                  className="skeleton-animate h-3 w-20 rounded"
                  style={{ background: "#E5E7EB" }}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#6B7280" }}
                  >
                    {kpi.label}
                  </span>
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{ background: kpi.accent + "14", color: kpi.accent }}
                  >
                    {kpi.icon}
                  </span>
                </div>
                <div
                  className="text-3xl font-semibold tabular-nums mb-1"
                  style={{ color: "#111827", letterSpacing: "-0.5px" }}
                >
                  {kpi.value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: kpi.positive ? "#16A34A" : "#B45309" }}
                >
                  {kpi.delta}
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div
        className="grid gap-5 mb-5"
        style={{ gridTemplateColumns: "1fr 380px" }}
      >
        {/* Interaction trend */}
        <Card style={{ padding: 24 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2
                className="text-sm font-semibold"
                style={{ color: "#111827" }}
              >
                Xu hướng tương tác
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                Số tương tác và khách hàng mới theo tháng
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart
              data={trend}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="navyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C0392B" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#C0392B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(val, name) => [
                  val,
                  name === "interactions" ? "Tương tác" : "Khách hàng mới",
                ]}
                labelFormatter={(l) => `Tháng ${l}`}
              />
              <Legend
                formatter={(v) =>
                  v === "interactions" ? "Tương tác" : "Khách hàng mới"
                }
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, color: "#6B7280" }}
              />
              <Area
                type="monotone"
                dataKey="interactions"
                stroke="#4F46E5"
                strokeWidth={2}
                fill="url(#navyGrad)"
                dot={{ r: 3, fill: "#4F46E5", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Area
                type="monotone"
                dataKey="newCustomers"
                stroke="#C0392B"
                strokeWidth={2}
                fill="url(#redGrad)"
                dot={{ r: 3, fill: "#C0392B", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Customers by product */}
        <Card style={{ padding: 24 }}>
          <h2
            className="text-sm font-semibold mb-1"
            style={{ color: "#111827" }}
          >
            Sở thích sản phẩm
          </h2>
          <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
            Phân phối theo nhóm sản phẩm
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              data={productInterests}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 100 }}
            >
              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="product"
                tick={{ fontSize: 11, fill: "#374151" }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(val) => [val, "Khách hàng"]}
              />
              <Bar
                dataKey="count"
                fill="#4F46E5"
                radius={[0, 3, 3, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom row: recent customers + tickets */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Recent customers */}
        <Card style={{ padding: 0 }}>
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "#E5E7EB" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#111827" }}>
              {user.role === "staff"
                ? "Khách hàng của tôi"
                : "Khách hàng gần đây"}
            </h2>
            <button
              onClick={() => navigate("customers")}
              className="flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: "#4F46E5" }}
            >
              Xem tất cả <ChevronRight size={12} />
            </button>
          </div>
          <div>
            {myCustomers.map((c, i) => (
              <button
                key={c.id}
                onClick={() => navigate("customer-detail", c.id)}
                className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors"
                style={{
                  borderBottom:
                    i < myCustomers.length - 1 ? "1px solid #E5E7EB" : "none",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#F9FAFB")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "transparent")
                }
              >
                <div className="min-w-0">
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#111827" }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="text-xs mt-0.5 truncate"
                    style={{ color: "#6B7280" }}
                  >
                    {c.company}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-3">
                  {c.followUpDue && (
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#B45309" }}
                    >
                      Cần theo dõi
                    </span>
                  )}
                  <StatusBadge status={c.status} map={CUSTOMER_STATUS_MAP} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Recent tickets */}
        <Card style={{ padding: 0 }}>
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "#E5E7EB" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#111827" }}>
              Yêu cầu hỗ trợ đang mở
            </h2>
            <button
              onClick={() => navigate("support-tickets")}
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: "#4F46E5" }}
            >
              Xem tất cả <ChevronRight size={12} />
            </button>
          </div>
          <div>
            {recentTickets.length === 0 ? (
              <div
                className="px-5 py-8 text-center text-sm"
                style={{ color: "#6B7280" }}
              >
                Không có yêu cầu nào đang mở.
              </div>
            ) : (
              recentTickets.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => navigate("support-tickets", t.id)}
                  className="w-full flex items-start justify-between px-5 py-3 text-left transition-colors"
                  style={{
                    borderBottom:
                      i < recentTickets.length - 1
                        ? "1px solid #E5E7EB"
                        : "none",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#F9FAFB")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "transparent")
                  }
                >
                  <div className="min-w-0 pr-3">
                    <div
                      className="text-sm font-medium truncate"
                      style={{ color: "#111827" }}
                    >
                      {t.title}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#6B7280" }}
                    >
                      {formatDate(t.createdAt)} · {t.createdByName}
                    </div>
                  </div>
                  <StatusBadge status={t.status} map={TICKET_STATUS_MAP} />
                </button>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
