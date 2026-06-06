import type { FC } from "react";
import { useRoutes } from "react-router-dom";
import LayoutPage from "../layouts";
import HomePage from "@pages/homePage";
import LoginPage from "@pages/loginPage/login";
import SignUp from "@pages/signUpPage";

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
    element: <LayoutPage />,
    children: [{ path: "homepage", element: <HomePage /> }],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
