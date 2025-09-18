import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import IndexPage from "../pages";
import Login from "../pages/auth/Login";
import DashboardHome from "../pages/dashboard";
import SettingsPage from "../pages/dashboard/settings";
import Verification from "../pages/auth/Verification";
import FansHome from "../pages/dashboard/fans";
import FanDetails from "../pages/dashboard/fans/details";
import AllFans from "../pages/dashboard/fans/viewmore/AllFans";
import AllTickets from "../pages/dashboard/fans/viewmore/AllTickets";
import AllVotes from "../pages/dashboard/fans/viewmore/AllVotes";
import { ReactElement } from "react";
import FansLayout from "../pages/dashboard/fans/layout";
import DashboardLayout from "../pages/dashboard/DashboardLayout";


interface IRoutes {
    path: string;
    element: ReactElement<any, any>;
    isProtected: boolean;
    children?: {
      index?: boolean;
      childPath?: string;
      childElement: ReactElement<any, any>;
    }[]
}

export const appRoutes: IRoutes[] = [
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
    path: "/fans",
    element: <FansLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <FansHome />,
      },
      {
        childPath: ":id",
        childElement: <FanDetails />,
      },
      {
        childPath: "all",
        childElement: <AllFans />,
      },
      {
        childPath: "tickets",
        childElement: <AllTickets />,
      },
      {
        childPath: "votes",
        childElement: <AllVotes />,
      },
  ]
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
