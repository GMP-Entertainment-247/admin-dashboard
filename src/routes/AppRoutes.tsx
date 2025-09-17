import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import IndexPage from "../pages";
import Login from "../pages/auth/Login";
import DashboardHome from "../pages/dashboard";
import SettingsPage from "../pages/dashboard/settings";
import Verification from "../pages/auth/Verification";
import DashboardLayout from "../pages/dashboard/DashboardLayout";

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
    path: "/rap-battle",
    element: (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Rap Battle Page</h1>
        <p>You are on /rap-battle route</p>
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: "/rap-battle/livestream",
    element: (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Livestream Page</h1>
        <p>You are on /rap-battle/livestream route</p>
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: "/rap-battle/votes",
    element: (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Votes Page</h1>
        <p>You are on /rap-battle/votes route</p>
      </DashboardLayout>
    ),
    isProtected: true,
  },
  {
    path: "/rap-battle/tickets",
    element: (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Tickets Page</h1>
        <p>You are on /rap-battle/tickets route</p>
      </DashboardLayout>
    ),
    isProtected: true,
  },
];
