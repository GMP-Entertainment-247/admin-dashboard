import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IconMenu } from "../../icons/icons";
import useWindowWidth from "../../utils/hooks/useWindowsWidth";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
// import { useLocation } from "react-router-dom";
import { DashboardLayoutContext } from "../../context/DashboardLayoutContext";
import Navbar from "../../components/shared/Navbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const mobileOpenSidebarRef = useRef<HTMLButtonElement>(null);
  const { isMobile } = useWindowWidth();
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  // const location = useLocation();
  const toggleSideNav = () => setIsSideNavOpen(!isSideNavOpen);

  useOutsideClick(
    [
      sidebarRef as React.RefObject<HTMLElement>,
      mobileOpenSidebarRef as React.RefObject<HTMLButtonElement>,
    ],
    () => {
      if (isMobile) {
        setIsSideNavOpen(false);
      }
    }
  );

  useEffect(() => {
    setIsSideNavOpen(!isMobile);
  }, [isMobile]);

  return (
    <DashboardLayoutContext.Provider
      value={{
        isSideNavOpen,
        toggleSideNav,
      }}
    >
      {/* Mobile Toggle Button */}
      {/* Element can be moved to header component .. just put it here for testing */}
      <button
        ref={mobileOpenSidebarRef}
        type="button"
        aria-label="Open sidebar"
        onClick={toggleSideNav}
        className="md:hidden fixed top-4 left-4 p-2 z-[2] bg-white rounded-lg shadow-md"
      >
        <IconMenu />
      </button>

      <Sidebar ref={sidebarRef} />

      <div
        style={{
          transitionProperty: "margin-left",
        }}
        className={clsx(
          "relative z-[1] duration-300 ease-in-out",
          {
            "md:ml-[60px] lg:ml-[60px]": !isSideNavOpen,
            "opacity-50 pointer-events-none md:ml-[235px] lg:ml-[256px]":
              isSideNavOpen,
          },
          "md:opacity-100 md:pointer-events-auto"
        )}
      >
        <main
          className={clsx("min-h-[calc(100vh-110px)] bg-[#F1F1F1] p-5")}
          // min height is 100vh - 110px (if 110px is the height of the header when added)
        >  
            <Navbar />
            <div>
                {children}
            </div>
        </main>
      </div>
    </DashboardLayoutContext.Provider>
  );
}
