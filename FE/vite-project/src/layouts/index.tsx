import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";

const LayoutPage = () => {
  return (
    <div className="layout-page">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Outlet />
    </div>
  );
};

export default LayoutPage;
