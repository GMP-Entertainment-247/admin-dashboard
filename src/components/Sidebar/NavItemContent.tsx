import clsx from "clsx";
import { ArrowUp } from "../../icons/icons";
import { useDashboardLayout } from "../../context/DashboardLayoutContext";

interface NavItemContentProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  isDropdown?: boolean;
  isDropdownOpen?: boolean;
  showLeftBar?: boolean;
  onClick?: () => void;
}

export default function NavItemContent({
  icon,
  text,
  isActive,
  isDropdown,
  isDropdownOpen,
  showLeftBar,
  onClick,
}: NavItemContentProps) {
  const { isSideNavOpen } = useDashboardLayout();

  return (
    <div
      className={clsx("relative", {
        "flex gap-1 group": showLeftBar,
      })}
      onClick={onClick}
    >
      {showLeftBar && (
        <>
          <div className="w-[6px]" />
          <div
            className={clsx(
              "absolute top-0 left-0 w-[6px] h-full rounded-r-md transition-colors duration-300",
              {
                "bg-brand-500": isActive,
                "group-hover:bg-gray-300": !isActive,
              }
            )}
          />
        </>
      )}
      <div
        className={clsx(
          "pr-[18px] py-4 flex items-center flex-1 relative transition-all duration-300 ease-in-out rounded-l-md",
          {
            "bg-brand-500 rounded-l-md": isActive,
            "group-hover:bg-gray-100": !isActive,
            "justify-between": isSideNavOpen,
            "justify-center": !isSideNavOpen,
            "pl-[10px]": showLeftBar,
            "pl-[14px]": !showLeftBar,
          }
        )}
      >
        <div
          className={clsx("flex items-center", {
            "text-white": isActive,
            "text-[#212121]": !isActive,
            "gap-3": isSideNavOpen,
            "gap-0": !isSideNavOpen,
          })}
        >
          <span className="flex-shrink-0">{icon}</span>
          <span
            className={clsx("text-sm font-normal whitespace-nowrap", {
              "w-0 overflow-hidden": !isSideNavOpen,
            })}
          >
            {text}
          </span>
        </div>
        {isDropdown && (
          <div
            className={clsx("transition-transform duration-300", {
              "rotate-180": !isDropdownOpen,
              "rotate-0": isDropdownOpen,
              "text-white": isActive,
              "text-[#212121]": !isActive,
              "absolute right-2": !isSideNavOpen,
            })}
          >
            <ArrowUp />
          </div>
        )}
      </div>
    </div>
  );
}
