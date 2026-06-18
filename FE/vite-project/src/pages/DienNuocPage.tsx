import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function DienNuocPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Điện nước
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trang Điện nước đang được phát triển.
        </Typography>
      </Paper>
    </Box>
  );
}
