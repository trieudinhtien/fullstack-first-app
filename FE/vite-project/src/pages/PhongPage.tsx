import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function PhongPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Phòng
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trang Phòng đang được phát triển.
        </Typography>
      </Paper>
    </Box>
  );
}
