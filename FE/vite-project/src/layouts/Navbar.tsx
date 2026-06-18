import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MaterialUISwitch from "../components/ThemeSwitch";
import useMode from "../stores/theme";
import { removeToken } from "../../src/utils";
import useUser from "@stores/user";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import ModalMyProfile from "./modalMyProfile";

const settings = [
  { title: "My Profile", icon: <PersonIcon /> },
  { title: "Settings", icon: <SettingsIcon /> },
  { title: "Notification", icon: <NotificationsActiveIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

function ResponsiveAppBar() {
  const { user, setUser } = useUser();
  const mode = useMode((state) => state.mode);
  const changeMode = useMode((state) => state.changeMode);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  console.log("user:", user);
  const [openProfile, setOpenProfile] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //logout
  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate("/sign-in");
  };

  //Change theme dark- light
  const handleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status: boolean = e.target.checked;
    changeMode(status);
  };

  const handleClickMenu = (setting: string) => {
    switch (setting) {
      case "Logout":
        handleLogout();
        break;
      case "My Profile":
        setOpenProfile(true);
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ mr: 5 }}>
            <img src="/logo.png" style={{ width: 70 }} alt="logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ mr: 3 }}>
            <MaterialUISwitch
              checked={mode}
              onChange={handleChangeTheme}
            ></MaterialUISwitch>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user?.image ? user.image : "/no-avatar.jpg"}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting?.title}
                  onClick={() => handleClickMenu(setting?.title)}
                >
                  <Box sx={{ mr: 2 }}>{setting.icon}</Box>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting?.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {
        <ModalMyProfile
          open={openProfile}
          handleCancel={() => setOpenProfile(false)}
        />
      }
    </AppBar>
  );
}
export default ResponsiveAppBar;
