import { Box, Paper, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface StatCardData {
  label: string;
  value: string;
  sub: string;
  trend: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}
interface KpiCardProps {
  data: StatCardData;
}
const KpiCard = ({ data }: KpiCardProps) => {
  const isUp = data.trend >= 0;
  return (
    <Paper sx={{ p: 2.5, borderRadius: 2, height: "100%" }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
};

export default KpiCard;
