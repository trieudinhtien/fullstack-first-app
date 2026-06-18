import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

// ── Types ───────────────────────────────────────────────────────────────────
interface StatCardData {
  label: string;
  value: string;
  sub: string;
  trend: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

interface AlertItem {
  type: "warning" | "info";
  message: string;
  time: string;
}

interface InvoiceRow {
  id: string;
  room: string;
  tenant: string;
  amount: string;
  due: string;
  status: "paid" | "pending" | "overdue";
}

// ── Mock data ───────────────────────────────────────────────────────────────
const REVENUE_DATA = [
  { month: "T1", revenue: 112, collected: 105 },
  { month: "T2", revenue: 105, collected: 98 },
  { month: "T3", revenue: 122, collected: 118 },
  { month: "T4", revenue: 128, collected: 122 },
  { month: "T5", revenue: 132, collected: 129 },
  { month: "T6", revenue: 143, collected: 138 },
];

const REVENUE_QUARTER = [
  { month: "T7", revenue: 138, collected: 130 },
  { month: "T8", revenue: 145, collected: 140 },
  { month: "T9", revenue: 148, collected: 144 },
  { month: "T10", revenue: 151, collected: 148 },
  { month: "T11", revenue: 155, collected: 150 },
  { month: "T12", revenue: 160, collected: 156 },
];

const OCCUPANCY_DATA = [
  { name: "Khu A", total: 20, occupied: 18 },
  { name: "Khu B", total: 16, occupied: 14 },
  { name: "Khu C", total: 12, occupied: 10 },
  { name: "Khu D", total: 8, occupied: 3 },
];

const PIE_DATA = [
  { name: "Đang thuê", value: 42, color: "#185FA5" },
  { name: "Phòng trống", value: 6, color: "#E6F1FB" },
];

const ALERTS: AlertItem[] = [
  {
    type: "warning",
    message: "Lê Minh Châu (B-101) — hợp đồng hết hạn 15/07/2025",
    time: "2 ngày nữa",
  },
  {
    type: "warning",
    message: "Hoàng Văn Đức (A-203) — hợp đồng hết hạn 20/07/2025",
    time: "7 ngày nữa",
  },
  {
    type: "warning",
    message: "INV-250603 (Lê Minh Châu) — hóa đơn quá hạn 5 ngày",
    time: "Quá hạn",
  },
  {
    type: "info",
    message: "Nguyễn Văn An (A-101) — thanh toán thành công 2.714.000đ",
    time: "1 giờ trước",
  },
  {
    type: "info",
    message: "Phạm Thị Dung (A-201) — ký hợp đồng mới đến 30/06/2026",
    time: "Hôm nay",
  },
];

const INVOICES: InvoiceRow[] = [
  {
    id: "INV-250601",
    room: "A-101",
    tenant: "Nguyễn Văn An",
    amount: "2.714.000đ",
    due: "05/06",
    status: "paid",
  },
  {
    id: "INV-250602",
    room: "A-102",
    tenant: "Trần Thị Bình",
    amount: "3.493.000đ",
    due: "05/06",
    status: "pending",
  },
  {
    id: "INV-250603",
    room: "B-101",
    tenant: "Lê Minh Châu",
    amount: "3.043.000đ",
    due: "01/06",
    status: "overdue",
  },
  {
    id: "INV-250604",
    room: "A-201",
    tenant: "Phạm Thị Dung",
    amount: "3.221.000đ",
    due: "05/06",
    status: "paid",
  },
  {
    id: "INV-250605",
    room: "B-102",
    tenant: "Hoàng Văn Đức",
    amount: "3.500.000đ",
    due: "05/06",
    status: "pending",
  },
];

const STATUS_CHIP: Record<
  InvoiceRow["status"],
  { label: string; bg: string; color: string }
> = {
  paid: { label: "Đã thanh toán", bg: "#EAF3DE", color: "#3B6D11" },
  pending: { label: "Chưa thanh toán", bg: "#FAEEDA", color: "#854F0B" },
  overdue: { label: "Quá hạn", bg: "#FCEBEB", color: "#A32D2D" },
};

// ── Sub-components ──────────────────────────────────────────────────────────
interface KpiCardProps {
  data: StatCardData;
}

function KpiCard({ data }: KpiCardProps) {
  const isUp = data.trend >= 0;
  return (
    <Paper sx={{ p: 2.5, borderRadius: 2, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            bgcolor: data.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: data.iconColor,
            "& svg": { fontSize: 20 },
          }}
        >
          {data.icon}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.4,
            px: 1,
            py: 0.4,
            borderRadius: 20,
            bgcolor: isUp ? "#EAF3DE" : "#FCEBEB",
            color: isUp ? "#3B6D11" : "#A32D2D",
          }}
        >
          {isUp ? (
            <TrendingUpIcon sx={{ fontSize: 13 }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 13 }} />
          )}
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 600 }}>
            {isUp ? "+" : ""}
            {data.trend}%
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, fontSize: "1.6rem", lineHeight: 1.1, mb: 0.4 }}
      >
        {data.value}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, color: "text.primary", mb: 0.25 }}
      >
        {data.label}
      </Typography>
      <Typography variant="caption">{data.sub}</Typography>
    </Paper>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
        {title}
      </Typography>
      {action && (
        <Button
          size="small"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 13 }} />}
          sx={{ fontSize: "0.75rem", color: "primary.main", p: 0, minWidth: 0 }}
        >
          {action}
        </Button>
      )}
    </Box>
  );
}

// ── DashboardPage ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [period, setPeriod] = useState<"6t" | "12t">("6t");
  const chartData = period === "6t" ? REVENUE_DATA : REVENUE_QUARTER;

  const KPI_CARDS: StatCardData[] = [
    {
      label: "Doanh thu tháng 6",
      value: "143tr",
      sub: "so với 132tr tháng trước",
      trend: 8,
      icon: <AttachMoneyIcon />,
      iconBg: "#E6F1FB",
      iconColor: "#185FA5",
    },
    {
      label: "Phòng đang cho thuê",
      value: "42/48",
      sub: "6 phòng đang trống",
      trend: 2,
      icon: <MeetingRoomOutlinedIcon />,
      iconBg: "#EAF3DE",
      iconColor: "#3B6D11",
    },
    {
      label: "Người thuê hiện tại",
      value: "47",
      sub: "3 hợp đồng sắp hết hạn",
      trend: 4,
      icon: <PeopleAltOutlinedIcon />,
      iconBg: "#FFF4E0",
      iconColor: "#854F0B",
    },
    {
      label: "Hóa đơn chưa thu",
      value: "14",
      sub: "tổng 48,2tr còn lại",
      trend: -3,
      icon: <ReceiptOutlinedIcon />,
      iconBg: "#FCEBEB",
      iconColor: "#A32D2D",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, width: "calc(100vw - 256px)", mx: "auto" }}>
      {/* ── Header ── */}
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tổng quan hoạt động tháng 6/2025
        </Typography>
      </Box>

      {/* ── KPI Row ── */}
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        {KPI_CARDS.map((card) => (
          <Grid size={{ xs: 12, lg: 3, sm: 6 }}>
            <KpiCard data={card} />
          </Grid>
        ))}
      </Grid>

      {/* ── Main charts row ── */}
      <Grid container sx={{ marginBottom: "20px" }} spacing={2}>
        {/* Revenue Area Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 2.5, borderRadius: 2, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Doanh thu & thu nhập thực
                </Typography>
                <Typography variant="caption">Đơn vị: triệu đồng</Typography>
              </Box>
              <ToggleButtonGroup
                value={period}
                exclusive
                onChange={(_, v) => v && setPeriod(v)}
                size="small"
                sx={{
                  "& .MuiToggleButton-root": {
                    fontSize: "0.72rem",
                    px: 1.5,
                    py: 0.4,
                    border: "0.5px solid rgba(0,0,0,0.12)",
                    textTransform: "none",
                    "&.Mui-selected": {
                      bgcolor: "#185FA5",
                      color: "#fff",
                      "&:hover": { bgcolor: "#0C447C" },
                    },
                  },
                }}
              >
                <ToggleButton value="6t">6 tháng</ToggleButton>
                <ToggleButton value="12t">12 tháng</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#185FA5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#185FA5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="gradCollected"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B6D11" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3B6D11" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,0,0,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#888780" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#888780" }}
                  axisLine={false}
                  tickLine={false}
                  domain={["auto", "auto"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Doanh thu"
                  stroke="#185FA5"
                  strokeWidth={2}
                  fill="url(#gradRevenue)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="collected"
                  name="Đã thu"
                  stroke="#3B6D11"
                  strokeWidth={2}
                  fill="url(#gradCollected)"
                  dot={false}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "0.72rem",
                    paddingBottom: 8,
                    top: -30,
                  }}
                  formatter={(v) => (
                    <span style={{ color: "#5F5E5A" }}>{v}</span>
                  )}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Occupancy Pie */}
        <Grid size={{ xs: 12, lg: 4, sm: 6 }}>
          <Paper sx={{ p: 2.5, borderRadius: 2, height: "100%" }}>
            <SectionHeader title="Tỷ lệ lấp đầy" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {PIE_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {PIE_DATA.map((d) => (
                <Box
                  key={d.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: d.color,
                      border:
                        d.color === "#E6F1FB" ? "1px solid #B5D4F4" : "none",
                    }}
                  />
                  <Typography variant="caption">
                    {d.name}: <b>{d.value}</b>
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <SectionHeader title="Theo khu" />
            {OCCUPANCY_DATA.map((k) => {
              const pct = Math.round((k.occupied / k.total) * 100);
              const color =
                pct >= 80 ? "#185FA5" : pct >= 60 ? "#854F0B" : "#A32D2D";
              return (
                <Box key={k.name}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <Typography variant="caption">{k.name}</Typography>
                    <Typography
                      variant="caption"
                      sx={{ color, fontWeight: 600 }}
                    >
                      {k.occupied}/{k.total} · {pct}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: "#F1EFE8",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: color,
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Paper>
        </Grid>
      </Grid>

      {/* ── Second row ── */}
      <Grid container spacing={2}>
        {/* Bar chart - Thu theo khu */}
        <Grid size={{ xs: 12, lg: 4, sm: 6 }}>
          <Paper sx={{ p: 2.5, borderRadius: 2, height: "100%" }}>
            <SectionHeader title="Doanh thu theo khu · T6" />
            <ResponsiveContainer width="100%" height={188}>
              <BarChart
                data={OCCUPANCY_DATA}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
                barSize={28}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,0,0,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#888780" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#888780" }}
                  axisLine={false}
                  tickLine={false}
                />
                <RTooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <Paper sx={{ p: 1.2, borderRadius: 1.5 }}>
                        <Typography variant="caption">{label}</Typography>
                        <Typography variant="caption">
                          {payload[0].value} phòng thuê
                        </Typography>
                      </Paper>
                    ) : null
                  }
                />
                <Bar dataKey="occupied" name="Đang thuê" radius={[4, 4, 0, 0]}>
                  {OCCUPANCY_DATA.map((_, i) => (
                    <Cell key={i} fill={i === 3 ? "#E6F1FB" : "#185FA5"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 0.5,
                color: "text.disabled",
              }}
            >
              Khu D đang bảo trì
            </Typography>
          </Paper>
        </Grid>

        {/* Alerts */}
        <Grid size={{ xs: 12, lg: 4, sm: 6 }}>
          <Paper sx={{ p: 2.5, borderRadius: 2, height: "100%" }}>
            <SectionHeader title="Cần xử lý" action="Xem tất cả" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {ALERTS.map((a, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    gap: 1.25,
                    alignItems: "flex-start",
                    p: 1.25,
                    borderRadius: 1.5,
                    bgcolor: a.type === "warning" ? "#FAEEDA" : "#F0F6FF",
                    border: "0.5px solid",
                    marginBottom: "5px",
                    borderColor:
                      a.type === "warning"
                        ? "rgba(133,79,11,0.15)"
                        : "rgba(24,95,165,0.15)",
                  }}
                >
                  {a.type === "warning" ? (
                    <WarningAmberOutlinedIcon
                      sx={{
                        fontSize: 15,
                        color: "#854F0B",
                        mt: 0.15,
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <CheckCircleOutlineIcon
                      sx={{
                        fontSize: 15,
                        color: "#185FA5",
                        mt: 0.15,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        lineHeight: 1.4,
                        color: a.type === "warning" ? "#5C3506" : "#0C447C",
                      }}
                    >
                      {a.message}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        color: a.type === "warning" ? "#854F0B" : "#378ADD",
                        fontWeight: 500,
                        mt: 0.25,
                      }}
                    >
                      {a.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Recent invoices */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ borderRadius: 2, overflow: "hidden", height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              >
                Hóa đơn gần đây
              </Typography>
              <Button
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 13 }} />}
                sx={{
                  fontSize: "0.75rem",
                  color: "primary.main",
                  p: 0,
                  minWidth: 0,
                }}
              >
                Xem tất cả
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Người thuê</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>TT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {INVOICES.map((row) => {
                    const s = STATUS_CHIP[row.status];
                    return (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 26,
                                height: 26,
                                fontSize: "0.7rem",
                                bgcolor: "#E6F1FB",
                                color: "#185FA5",
                              }}
                            >
                              {row.tenant.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "0.78rem",
                                  fontWeight: 500,
                                  lineHeight: 1.2,
                                }}
                              >
                                {row.tenant}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {row.room}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: "0.78rem", fontWeight: 600 }}
                          >
                            {row.amount}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            HH: {row.due}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={s.label}
                            size="small"
                            sx={{
                              bgcolor: s.bg,
                              color: s.color,
                              fontSize: "0.65rem",
                              height: 20,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
