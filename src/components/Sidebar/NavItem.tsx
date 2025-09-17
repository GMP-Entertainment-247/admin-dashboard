import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDashboardLayout } from "../../context/DashboardLayoutContext";
import useWindowWidth from "../../utils/hooks/useWindowsWidth";
import { CircleIcon } from "../../icons/icons";
import NavItemContent from "./NavItemContent";

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

  // Check if current route matches the main link or any dropdown links
  const isCurrentlyActive =
    isActive ||
    (link && location.pathname === link) ||
    (isDropdown &&
      dropdownItems.some((item) => location.pathname === item.link));

  // Check if any child route is active
  const isChildActive =
    isDropdown && dropdownItems.some((item) => location.pathname === item.link);

  // Auto-open dropdown if we're on a child route
  useEffect(() => {
    if (isDropdown && isChildActive) {
      setIsDropdownOpen(true);
    }
  }, [isDropdown, isChildActive]);

  const handleMainItemClick = () => {
    if (isDropdown) {
      // If we're already on the parent route, toggle dropdown
      if (location.pathname === link) {
        setIsDropdownOpen(!isDropdownOpen);
      } else {
        // Navigate to parent route and open dropdown
        setIsDropdownOpen(true);
      }
    } else {
      // For non-dropdown items, close sidebar on mobile
      if (isMobile && isSideNavOpen) {
        toggleSideNav();
      }
    }
  };

  const handleChildItemClick = () => {
    // Close sidebar on mobile when clicking child items
    if (isMobile && isSideNavOpen) {
      toggleSideNav();
    }
  };

  const mainItemContent = (
    <NavItemContent
      icon={icon}
      text={text}
      isActive={isCurrentlyActive}
      isDropdown={isDropdown}
      isDropdownOpen={isDropdownOpen}
      showLeftBar={true}
    />
  );

  return (
    <>
      {/* Main Item */}
      {link ? (
        <Link to={link} onClick={handleMainItemClick} className="block">
          {mainItemContent}
        </Link>
      ) : (
        <button type="button" onClick={handleMainItemClick} className="block">
          {mainItemContent}
        </button>
      )}

      {/* Dropdown Items */}
      {isDropdown && isDropdownOpen && (
        <div className="ml-[10px] space-y-2">
          {dropdownItems.map((item, childIndex) => {
            const isChildCurrentlyActive = location.pathname === item.link;
            return (
              <Link
                key={childIndex}
                to={item.link}
                onClick={handleChildItemClick}
                className="block group"
              >
                <NavItemContent
                  icon={<CircleIcon />}
                  text={item.text}
                  isActive={isChildCurrentlyActive}
                  showLeftBar={false}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
