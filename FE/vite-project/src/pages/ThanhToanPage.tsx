import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function ThanhToanPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Thanh toán
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trang Thanh toán đang được phát triển.
        </Typography>
      </Paper>
    </Box>
  );
}
