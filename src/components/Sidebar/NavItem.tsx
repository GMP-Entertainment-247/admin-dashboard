import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";
import { useDashboardLayout } from "../../context/DashboardLayoutContext";
import useWindowWidth from "../../utils/hooks/useWindowsWidth";
import { ArrowUp } from "../../icons/icons";

interface DropdownItem {
  text: string;
  link: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  link?: string;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  isActive?: boolean;
  index: number;
}

export default function NavItem({
  icon,
  text,
  link,
  isDropdown = false,
  dropdownItems = [],
  isActive = false,
  index,
}: NavItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { isSideNavOpen, toggleSideNav } = useDashboardLayout();
  const { isMobile } = useWindowWidth();

  const handleClick = () => {
    if (isDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      if (isMobile && isSideNavOpen) {
        toggleSideNav();
      }
    }
  };

  // Check if current route matches the main link or any dropdown links
  const isCurrentlyActive =
    isActive ||
    (link && location.pathname === link) ||
    (isDropdown &&
      dropdownItems.some((item) => location.pathname === item.link));

  const content = (
    <div className="flex gap-1 relative">
      <div className="w-[6px] " />
      <div
        className={clsx("absolute top-0 left-0 w-[6px] h-full rounded-r-md", {
          "bg-brand-500": index === 4,
        })}
      />
      <div
        className={clsx(
          "pl-[10px] pr-[18px] py-4 flex items-center justify-between flex-1",
          {
            "bg-brand-500 rounded-l-md": index === 4,
          }
        )}
      >
        <div
          className={clsx("flex items-center gap-3", {
            "text-white": index === 4,
            "text-[#212121]": index !== 4,
          })}
        >
          {icon}
          <span className="text-sm font-normal">{text}</span>
        </div>
        {isDropdown && (
          <div
            className={clsx("transition-transform duration-300", {
              "rotate-180": !isDropdownOpen,
              "rotate-0": isDropdownOpen,
              "text-white": index === 4,
              "text-[#212121]": index !== 4,
            })}
          >
            <ArrowUp />
          </div>
        )}
      </div>
    </div>
  );

  return content;
}
