import { forwardRef } from "react";
import { useDashboardLayout } from "../../context/DashboardLayoutContext";
import logo from "../../images/gmp-logo.jpg";
import { IconSidebarCollapse } from "../../icons/icons";
import NavItem from "./NavItem";
import { navigationItems } from "./navigationData";
import clsx from "clsx";

interface SidebarProps {
  ref: React.RefObject<HTMLElement>;
}

const Sidebar = forwardRef<HTMLElement, SidebarProps>((_, ref) => {
  const { isSideNavOpen, toggleSideNav } = useDashboardLayout();

  return (
    <aside
      ref={ref}
      style={{
        transitionProperty: "width, transform",
      }}
      className={clsx(
        "bg-white h-screen fixed left-0 top-0 w-[256px] z-[3] shadow-[1px_0_4px_0_rgba(0,0,0,0.1)] duration-300 ease-in-out",
        {
          "-translate-x-full md:w-[78px]": !isSideNavOpen,
          "translate-x-0 md:w-[235px] lg:w-[256px]": isSideNavOpen,
        },
        "md:translate-x-0"
      )}
    >
      <div
        className={clsx("flex items-center pt-8 px-3 mb-10 relative", {
          "justify-center": !isSideNavOpen,
          "justify-between": isSideNavOpen,
        })}
      >
        <div
          className={clsx("flex items-center gap-3", {
            "gap-0": !isSideNavOpen,
          })}
        >
          <div className="w-[40px] h-[40px] relative rounded-full overflow-hidden flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
          <p
            className={clsx("text-base font-semibold text-[#000000]", {
              hidden: !isSideNavOpen,
            })}
          >
            GMP
          </p>
        </div>
        <button
          type="button"
          className={clsx("text-gold-35 flex-shrink-0", {
            "absolute right-3": !isSideNavOpen,
          })}
          aria-label="Toggle sidebar"
          onClick={toggleSideNav}
        >
          <IconSidebarCollapse />
        </button>
      </div>

      <nav>
        {navigationItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={item.text}
            link={item.link}
            isDropdown={item.isDropdown}
            dropdownItems={item.dropdownItems}
            index={index}
          />
        ))}
      </nav>
    </aside>
  );
});

export default Sidebar;
