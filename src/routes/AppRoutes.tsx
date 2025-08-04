import Login from "../pages/auth/Login";
import DashboardHome from "../pages/dashboard";
import SettingsPage from "../pages/dashboard/settings";

export const appRoutes = [
  // Public Routes
  {
    path: "/login",
    element: <Login />,
    isProtected: false,
  },

  // ProtectedRoutes
  {
    path: "/dashboard",
    element: <DashboardHome />,
    isProtected: true,
  },
  {
    path: "/dashboard/settings",
    element: <SettingsPage />,
    isProtected: true,
  },
];
