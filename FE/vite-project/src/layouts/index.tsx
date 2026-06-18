import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import { Box, Stack } from "@mui/material";
import SideBar from "./SideBar";

const LayoutPage = () => {
  return (
    <div className="layout-page">
      <Box>
        <ResponsiveAppBar></ResponsiveAppBar>
      </Box>
      <Box>
        <Stack direction={"row"} spacing={2}>
          <SideBar />
          <Outlet />
        </Stack>
      </Box>
    </div>
  );
};

export default LayoutPage;
