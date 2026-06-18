import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function HoaDonPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Hóa đơn
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trang Hóa đơn đang được phát triển.
        </Typography>
      </Paper>
    </Box>
  );
}
