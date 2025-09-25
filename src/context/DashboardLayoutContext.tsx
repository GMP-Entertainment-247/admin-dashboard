import { createContext, useContext } from "react";

export const DashboardLayoutContext = createContext<{
  isSideNavOpen: boolean;
  toggleSideNav: () => void;
}>({
  isSideNavOpen: false,
  toggleSideNav: () => {},
});

export const useDashboardLayout = () => {
  const context = useContext(DashboardLayoutContext);

  if (!context) {
    throw new Error(
      "useDashboardLayout must be used within a DashboardLayoutContext"
    );
  }

  return context;
};
