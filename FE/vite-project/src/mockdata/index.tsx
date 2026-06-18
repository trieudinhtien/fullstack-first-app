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
