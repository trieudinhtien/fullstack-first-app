import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableBasic from "@components/TableBasic";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const columns: any[] = [
  { id: "name", label: "Tên khu", minWidth: 170 },
  { id: "address", label: "Địa chỉ", minWidth: 100 },
  {
    id: "name",
    label: "Họ tên",
    minWidth: 170,
    align: "right",
  },
  {
    id: "cccd",
    label: "cccd",
    minWidth: 170,
    align: "right",
  },
  {
    id: "code",
    label: "Phòng",
    minWidth: 170,
    align: "right",
  },
  {
    id: "date",
    label: "Ngày vào",
    minWidth: 170,
    align: "right",
  },
  {
    id: "phone",
    label: "SĐT",
    minWidth: 170,
    align: "right",
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    align: "right",
  },
];

const rows = [];
export default function NguoiThuePage() {
  return (
    <Box sx={{ width: "calc(100vw - 256px)", pr: "10px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ paddingTop: "20px", paddingBottom: "10px" }}
        >
          Người thuê
        </Typography>

        <Button startIcon={<AddIcon />} variant="contained">
          Thêm người thuê
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <TableBasic
          rows={[]}
          title="Thống kê người thuê"
          page={1}
          rowsPerPage={20}
          columns={columns}
        />
      </Paper>
    </Box>
  );
}
