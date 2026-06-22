import type { FC } from "react";
import { useRoutes } from "react-router-dom";
import LayoutPage from "../layouts";
import LoginPage from "@pages/loginPage/login";
import SignUp from "@pages/signUpPage";
import ProtectedRoute from "./protectedRoute";
import DienNuocPage from "@pages/DienNuocPage";
import HoaDonPage from "@pages/HoaDonPage";
import KhuTroPage from "@pages/KhuTroPage/KhuTroPage";
import NguoiThuePage from "@pages/NguoiThuePage";
import PhongPage from "@pages/PhongThue/PhongPage";
import ThanhToanPage from "@pages/ThanhToanPage";
import HopDongPage from "@pages/HopDongPage";
import DashboardPage from "@pages/dashboardPage/DashboardPage";

const routeList = [
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/energy",
        element: (
          <ProtectedRoute>
            <DienNuocPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/invoice",
        element: (
          <ProtectedRoute>
            <HoaDonPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/area",
        element: (
          <ProtectedRoute>
            <KhuTroPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tenant",
        element: (
          <ProtectedRoute>
            <NguoiThuePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/room",
        element: (
          <ProtectedRoute>
            <PhongPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <ThanhToanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contract",
        element: (
          <ProtectedRoute>
            <HopDongPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
