import clsx from "clsx";
import { useDashboardLayout } from "../../context/DashboardLayoutContext";
import useWindowWidth from "../../utils/hooks/useWindowsWidth";
import { type ReactNode } from "react";

interface FixedFooterInterface {
  children: ReactNode;
  className?: string;
}

const FixedFooter: React.FC<FixedFooterInterface> = ({
  children,
  className,
}) => {
  const { isSideNavOpen } = useDashboardLayout();
  const { isMobile, windowWidth } = useWindowWidth();
  const isLargeScreen = windowWidth !== undefined && windowWidth >= 1024;
  return (
    <div
      className={clsx(
        "flex justify-end gap-3 bg-white p-5 rounded-lg fixed bottom-2 shadow-[0_0_12px_0_#00000014] duration-300 ease-in-out z-[2] items-center",
        className
      )}
      style={{
        left: isMobile
          ? "20px"
          : isSideNavOpen
          ? isLargeScreen
            ? "calc(256px + 20px)"
            : "calc(235px + 20px)"
          : "calc(78px + 20px)",
        right: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default FixedFooter;
