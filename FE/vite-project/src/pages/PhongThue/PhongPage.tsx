import { Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import RoomItemList from "./ItemRoom";

interface IRoom {
  code: string;
  status: string;
  floor: number;
  price: number;
}

const mockRooms: IRoom[] = [
  {
    code: "P101",
    status: "Có người",
    floor: 1,
    price: 2500000,
  },
  {
    code: "P102",
    status: "Bảo trì",
    floor: 1,
    price: 2800000,
  },
  {
    code: "P201",
    status: "Có người",
    floor: 2,
    price: 3000000,
  },
  {
    code: "P202",
    status: "Bảo trì",
    floor: 2,
    price: 3200000,
  },
  {
    code: "P301",
    status: "Trống",
    floor: 3,
    price: 3500000,
  },
];

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PhongPage() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    console.log("value:", newValue);
    setSelectedTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
          Phòng
        </Typography>

        <Button startIcon={<AddIcon />} variant="contained">
          Thêm Phòng
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Tất cả" {...a11yProps(0)} />
            <Tab label="Đã thuê" {...a11yProps(1)} />
            <Tab label="Trống" {...a11yProps(2)} />
            <Tab label="Bảo trì" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={selectedTab} index={0}>
          <Grid container spacing={2}>
            {mockRooms?.map((room, index) => (
              <Grid size={2} key={index}>
                <RoomItemList
                  code={room.code}
                  floor={room.floor}
                  status={room.status}
                  price={room.price}
                />
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={1}>
          Đã thuê
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={2}>
          Trống
        </CustomTabPanel>
        <CustomTabPanel value={selectedTab} index={3}>
          Bảo trì
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}
