import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

interface IProps {
  code: string;
  status: string;
  floor: number;
  price: number;
}

const RoomItemList = ({ code, status, price, floor }: IProps) => {
  return (
    <Card variant="outlined" sx={{ position: "relative" }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {code}
        </Typography>
        <Typography variant="h5" component="div">
          Tầng {floor}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {price} / tháng
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <Chip variant="filled" size="small" label={status} color="success" />
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default RoomItemList;
