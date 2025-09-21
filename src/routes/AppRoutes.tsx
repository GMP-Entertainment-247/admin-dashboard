import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import IndexPage from "../pages";
import Login from "../pages/auth/Login";
import DashboardHome from "../pages/dashboard";
import SettingsPage from "../pages/dashboard/settings";
import Verification from "../pages/auth/Verification";
import Cards from "../components/shared/Cards";
// import path from "path";

export const appRoutes = [
  // Public Routes
  {
    path: "/login",
    element: <Login />,
    isProtected: false,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    isProtected: false,
  },
  {
    path: "/verify",
    element: <Verification />,
    isProtected: false,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    isProtected: false,
  },
  {
    path: "/",
    element: <IndexPage />,
    isProtected: false,
  },

  // ProtectedRoutes
  {
    path: "/dashboard",
    element: <DashboardHome />,
    isProtected: true,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    isProtected: true,
  },
  {
    path: "/userdetails",
    element: <Cards />,
    // isProtected: true,
  },
];
