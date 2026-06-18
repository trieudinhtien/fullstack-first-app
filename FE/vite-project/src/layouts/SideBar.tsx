import { Box, styled } from "@mui/material";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import GroupIcon from "@mui/icons-material/Group";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import BoltIcon from "@mui/icons-material/Bolt";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const LabelMenu = styled("div")({
  color: "#838383",
  padding: "17px",
  borderRadius: "4px",
  fontSize: "small",
});

const SideBar = () => {
  return (
    <Box
      sx={{
        width: "256px",
        height: "calc(100vh - 76px)",
      }}
    >
      <Paper
        sx={{
          width: 320,
          maxWidth: "100%",
          borderRadius: 0,
          height: "calc(100vh - 74px)",
        }}
      >
        <MenuList>
          <LabelMenu>TỔNG QUAN</LabelMenu>
          <MenuItem component={Link} to="/dashboard">
            <ListItemIcon>
              <SpaceDashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>
          <Divider />
          <LabelMenu>QUẢN LÍ</LabelMenu>
          <MenuItem component={Link} to="/area">
            <ListItemIcon>
              <MapsHomeWorkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Khu trọ</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/room">
            <ListItemIcon>
              <MeetingRoomIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Phòng</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/tenant">
            <ListItemIcon>
              <GroupIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Người thuê</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/contract">
            <ListItemIcon>
              <TextSnippetIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Hợp đồng</ListItemText>
          </MenuItem>
          <Divider />
          <LabelMenu>TÀI CHÍNH</LabelMenu>
          <MenuItem component={Link} to="/energy">
            <ListItemIcon>
              <BoltIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Điện nước</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/invoice">
            <ListItemIcon>
              <ReceiptIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Hoá đơn</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/payment">
            <ListItemIcon>
              <CreditCardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Thanh toán</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem sx={{ color: "#d32f2f" }}>
            <ListItemIcon>
              <LogoutIcon color="error" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đăng xuất</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Box>
  );
};

export default SideBar;
