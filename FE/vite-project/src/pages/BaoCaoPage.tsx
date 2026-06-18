import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function BaoCaoPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Báo cáo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trang Báo cáo đang được phát triển.
        </Typography>
      </Paper>
    </Box>
  );
}
