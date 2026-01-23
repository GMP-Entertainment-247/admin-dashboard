import { forwardRef } from "react";
import { useDashboardLayout } from "../../context/DashboardLayoutContext";
import logo from "../../images/gmp-logo.jpg";
import { IconSidebarCollapse } from "../../icons/icons";
import NavItem from "./NavItem";
import { ArrowRight } from "lucide-react";
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
        "bg-white h-screen fixed left-0 top-0 w-[256px] shadow-[1px_0_4px_0_rgba(0,0,0,0.1)] duration-300 ease-in-out z-[3] flex flex-col gap-10 [&>*]:w-full",
        {
          "-translate-x-full md:w-[78px]": !isSideNavOpen,
          "translate-x-0 md:w-[235px] lg:w-[256px]": isSideNavOpen,
        },
        "md:translate-x-0"
      )}
    >
      <div
        className={clsx(
          "flex items-center pt-8 px-3 transition-all duration-300 ease-in-out",
          {
            "justify-center": !isSideNavOpen,
            "justify-between": isSideNavOpen,
          }
        )}
      >
        <div
          className={clsx("flex items-center", {
            "gap-3": isSideNavOpen,
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
            style={{
              transitionProperty: "width",
            }}
            className={clsx(
              "text-base font-semibold whitespace-nowrap text-[#000000] duration-300 ease-in-out",
              {
                "w-0 overflow-hidden": !isSideNavOpen,
              }
            )}
          >
            GMP
          </p>
        </div>
        <button
          type="button"
          className={clsx("flex-shrink-0", {
            "absolute right-0 translate-x-1/2 hidden md:block bg-gold-35 text-white rounded-full p-1":
              !isSideNavOpen,
            "text-gold-35": isSideNavOpen,
          })}
          aria-label="Toggle sidebar"
          onClick={toggleSideNav}
        >
          {isSideNavOpen ? <IconSidebarCollapse /> : <ArrowRight size={20} />}
        </button>
      </div>

      <nav className="space-y-2 flex-1 overflow-auto">
        {navigationItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={item.text}
            link={item.link}
            isDropdown={item.isDropdown}
            dropdownItems={item.dropdownItems}
            // index={index}
          />
        ))}
      </nav>
    </aside>
  );
});

export default Sidebar;
