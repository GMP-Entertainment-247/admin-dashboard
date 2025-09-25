import {
  IconDashboard,
  IconMicrophone,
  IconBarChart,
  IconPerson,
  IconRapBattle,
  IconCalendar,
  IconBell,
} from "../../icons/icons";

export interface NavigationItem {
  icon: React.ReactNode;
  text: string;
  link?: string;
  isDropdown?: boolean;
  dropdownItems?: {
    text: string;
    link: string;
  }[];
}

export const navigationItems: NavigationItem[] = [
  {
    icon: <IconDashboard />,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <IconMicrophone />,
    text: "Artists",
    link: "/artists",
  },
  {
    icon: <IconBarChart />,
    text: "Investors",
    link: "/investors",
  },
  {
    icon: <IconPerson />,
    text: "Fans",
    link: "/fans",
  },
  {
    icon: <IconRapBattle />,
    text: "Rap Battle",
    link: "/rap-battle",
    isDropdown: true,
    dropdownItems: [
      {
        text: "Livestream",
        link: "/rap-battle/livestream",
      },
      {
        text: "Votes",
        link: "/rap-battle/votes",
      },
      {
        text: "Tickets",
        link: "/rap-battle/tickets",
      },
    ],
  },
  {
    icon: <IconCalendar />,
    text: "Bookings",
    link: "/bookings",
  },
  {
    icon: <IconBell />,
    text: "Notifications",
    link: "/notifications",
  },
];
