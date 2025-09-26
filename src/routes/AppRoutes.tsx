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
import RapBattleLayout from "../pages/dashboard/rap-battle/layout";
import RapBattleHome from "../pages/dashboard/rap-battle";
import AllContestants from "../pages/dashboard/rap-battle/viewmore/AllContestant";
import LivestreamHome from "../pages/dashboard/rap-battle/livestream";
import AllLivestreams from "../pages/dashboard/rap-battle/viewmore/AllLivestream";
import TicketHome from "../pages/dashboard/rap-battle/ticket";
import VotesHome from "../pages/dashboard/rap-battle/vote";
import AllRapBattleTickets from "../pages/dashboard/rap-battle/viewmore/AllTickets";
import AllRapBattleVotes from "../pages/dashboard/rap-battle/viewmore/AllVotes";
import CreateEvent from "../pages/dashboard/rap-battle/create/events";
import CreateTicket from "../pages/dashboard/rap-battle/create/tickets";


interface IRoutes {
  path: string;
  element: ReactElement<any, any>;
  isProtected: boolean;
  children?: {
    index?: boolean;
    childPath?: string;
    childElement: ReactElement<any, any>;
  }[];
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
    path: "/rap-battle",
    element: <RapBattleLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <RapBattleHome />,
      },
      {
        childPath: "all",
        childElement: <AllContestants />,
      },
      {
        childPath: "livestream",
        childElement: <LivestreamHome />,
      },
      {
        childPath: "livestream/all",
        childElement: <AllLivestreams />,
      },
      {
        childPath: "votes",
        childElement: <VotesHome />,
      },
      {
        childPath: "votes/all",
        childElement: <AllRapBattleVotes />,
      },
      {
        childPath: "tickets",
        childElement: <TicketHome />,
      },
      {
        childPath: "tickets/all",
        childElement: <AllRapBattleTickets />,
      },
      {
        childPath: "create-ticket",
        childElement: <CreateTicket />,
      },
      {
        childPath: "create-event",
        childElement: <CreateEvent />,
      },
    ]
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    isProtected: true,
  },
];
