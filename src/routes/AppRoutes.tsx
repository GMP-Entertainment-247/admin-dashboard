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
import Announcement from "../pages/dashboard/rap-battle/announcement";
import AllAnnouncements from "../pages/dashboard/rap-battle/viewmore/AllAnnouncements";
import TicketHome from "../pages/dashboard/rap-battle/ticket";
import VotesHome from "../pages/dashboard/rap-battle/vote";
import AllRapBattleTickets from "../pages/dashboard/rap-battle/viewmore/AllTickets";
import AllRapBattleVotes from "../pages/dashboard/rap-battle/viewmore/AllVotes";
import CreateEvent from "../pages/dashboard/rap-battle/create/events";
import CreateTicket from "../pages/dashboard/rap-battle/create/tickets";
import BlogsHome from "../pages/dashboard/blogs";
import BlogsLayout from "../pages/dashboard/blogs/layout";
import CreateBlog from "../pages/dashboard/blogs/create-blog";
import EditBlog from "../pages/dashboard/blogs/edit-blog";
import ContestantDetails from "../pages/dashboard/rap-battle/user";
import PreviewBlog from "../pages/dashboard/blogs/preview-blog";
import BlogDetails from "../pages/dashboard/blogs/blog-details";
import Profile from "../pages/dashboard/settings/profile";
import SettingsLayout from "../pages/dashboard/settings/layout";
import SettingsManagement from "../pages/dashboard/settings/management";
import SettingsTeam from "../pages/dashboard/settings/team";
import SettingsOthers from "../pages/dashboard/settings/others";
import BookingsLayout from "../pages/dashboard/bookings/layout";
import BookingsHome from "../pages/dashboard/bookings";
import ArtistLayout from "../pages/dashboard/artists/layout";
import ArtistsHome from "../pages/dashboard/artists";
import AllArtists from "../pages/dashboard/artists/tables/allArtists";
import AllOffers from "../pages/dashboard/artists/tables/allOffers";
import AllBookings from "../pages/dashboard/artists/tables/allBookings";
import AllUploads from "../pages/dashboard/artists/tables/allUploads";
import ArtistDetails from "../pages/dashboard/artists/details";
import CelebrityLayout from "../pages/dashboard/celebrities/layout";
import CelebrityHome from "../pages/dashboard/celebrities";
import CelebrityDetails from "../pages/dashboard/celebrities/details";
import AllCelebrities from "../pages/dashboard/celebrities/tables/allCelebrities";
import AllCelebrityBookings from "../pages/dashboard/celebrities/tables/allBookings";
import InvestorLayout from "../pages/dashboard/investors/layout";
import InvestorsHome from "../pages/dashboard/investors";
import InvestorDetails from "../pages/dashboard/investors/details";
import AllInvestments from "../pages/dashboard/investors/investments/allInvestments";
import InvestmentDetail from "../pages/dashboard/investors/investments/details";
import EarningsLayout from "../pages/dashboard/earnings/layout";
import EarningsHome from "../pages/dashboard/earnings";
import AllPayouts from "../pages/dashboard/earnings/allpayouts";
import NotificationsPage from "../pages/dashboard/notifications";
import BookingDetails from "../pages/dashboard/bookings/details";
import AllBookingsPage from "../pages/dashboard/bookings/all";
import AnnouncementDetails from "../pages/dashboard/rap-battle/announcement-details";
import AnnouncementLayout from "../pages/dashboard/rap-battle/announcements/announcement-layout";
import EditAnnouncement from "../pages/dashboard/rap-battle/edit-announcement";
import PreviewAnnouncement from "../pages/dashboard/rap-battle/preview-announcement";
import CreateAnnouncement from "../pages/dashboard/rap-battle/create/announcement";
import BeatsLayout from "../pages/dashboard/beats/layout";
import BeatsHome from "../pages/dashboard/beats";
import UploadBeat from "../pages/dashboard/beats/upload";
import EditBeat from "../pages/dashboard/beats/edit-beat";
import PreviewBeat from "../pages/dashboard/beats/preview-beat";
import BeatDetails from "../pages/dashboard/beats/beat-details";

interface RouteNode {
  index?: boolean;
  childPath?: string;
  childElement: ReactElement<any, any>;
  children?: RouteNode[]; // 👈 recursion
}

interface IRoutes {
  path: string;
  element: ReactElement<any, any>;
  isProtected: boolean;
  children?: RouteNode[];
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
    path: "/artists",
    element: <ArtistLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <ArtistsHome />,
      },
      {
        childPath: ":id",
        childElement: <ArtistDetails />,
      },
      {
        childPath: "all",
        childElement: <AllArtists />,
      },
      {
        childPath: "offers/:id",
        childElement: <AllOffers />,
      },
      {
        childPath: "bookings/:id",
        childElement: <AllBookings />,
      },
      {
        childPath: "uploads/:id",
        childElement: <AllUploads />,
      },
    ],
  },
  {
    path: "/investors",
    element: <InvestorLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <InvestorsHome />,
      },
      {
        childPath: ":id",
        childElement: <InvestorDetails />,
      },
      {
        childPath: "investments",
        childElement: <AllInvestments />,
      },
      {
        childPath: "investment/:id",
        childElement: <InvestmentDetail />,
      },
    ],
  },
  {
    path: "/celebrities",
    element: <CelebrityLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <CelebrityHome />,
      },
      {
        childPath: ":id",
        childElement: <CelebrityDetails />,
      },
      {
        childPath: "all",
        childElement: <AllCelebrities />,
      },
      {
        childPath: "bookings",
        childElement: <AllCelebrityBookings />,
      },
    ],
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
    ],
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
        childPath: "user/:id",
        childElement: <ContestantDetails />,
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
      {
        childPath: "announcement",
        childElement: <AnnouncementLayout />,
        children: [
          {
            index: true,
            childElement: <Announcement />,
          },
          {
            childPath: "all",
            childElement: <AllAnnouncements />,
          },
          {
            childPath: "create-announcement",
            childElement: <CreateAnnouncement />,
          },
          {
            childPath: "preview",
            childElement: <PreviewAnnouncement />,
          },
          {
            childPath: ":announcementId",
            childElement: <AnnouncementDetails />,
          },
          {
            childPath: ":announcementId/edit",
            childElement: <EditAnnouncement />,
          },
        ],
      },
    ],
  },
  {
    path: "/blogs",
    element: <BlogsLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <BlogsHome />,
      },
      {
        childPath: "create-blog",
        childElement: <CreateBlog />,
      },
      {
        childPath: "edit-blog/:blogId",
        childElement: <EditBlog />,
      },
      {
        childPath: "preview",
        childElement: <PreviewBlog />,
      },
      {
        childPath: ":blogId",
        childElement: <BlogDetails />,
      },
    ],
  },
  {
    path: "/bookings",
    element: <BookingsLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <BookingsHome />,
      },
      {
        childPath: ":bookingId",
        childElement: <BookingDetails />,
      },
      {
        childPath: "all",
        childElement: <AllBookingsPage />,
      }
    ],
  },
  {
    path: "/earnings",
    element: <EarningsLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <EarningsHome />,
      },
      {
        childPath: "payouts",
        childElement: <AllPayouts />,
      },
    ],
  },
  {
    path: "/notifications",
    element: <NotificationsPage />,
    isProtected: true,
  },
  {
    path: "/settings",
    element: <SettingsLayout />,
    isProtected: true,
    children: [
      {
        index: true,
        childElement: <SettingsPage />,
      },
      {
        childPath: "profile",
        childElement: <Profile />,
      },
      {
        childPath: "management",
        childElement: <SettingsManagement />,
      },
      {
        childPath: "team",
        childElement: <SettingsTeam />,
      },
      {
        childPath: "others",
        childElement: <SettingsOthers />,
      },
    ],
  },
  {
    path: "/beats",
    element: <BeatsLayout />,
    isProtected: true,
    children: [
      { index: true, childElement: <BeatsHome /> },
      { childPath: "upload", childElement: <UploadBeat /> },
      { childPath: "preview", childElement: <PreviewBeat /> },
      { childPath: ":beatId", childElement: <BeatDetails /> },
      { childPath: ":beatId/edit", childElement: <EditBeat /> },
    ],
  },
];
