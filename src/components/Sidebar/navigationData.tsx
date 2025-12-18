import {
  IconDashboard,
  IconMicrophone,
  IconBarChart,
  IconPerson,
  IconRapBattle,
  IconCalendar,
  IconBell,
} from "../../icons/icons";

import { Settings, Music4, FileText } from "lucide-react";

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
    icon: <IconMicrophone />,
    text: "Celebrities",
    link: "/celebrities",
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
        text: "Announcement",
        link: "/rap-battle/annoucement",
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
  {
    icon: <Music4 className="w-[18px] h-[18px]" />,
    text: "Beats",
    link: "/beats",
  },
  {
    icon: <FileText className="w-[18px] h-[18px]" />,
    text: "News & Blogs",
    link: "/blogs",
  },
  {
    icon: <Settings className="w-[18px] h-[18px]" />,
    text: "Settings",
    link: "/settings",
  },
];
