import { Outlet, useLocation } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import Tabs from "../../../components/shared/Tabs";
import clsx from "clsx";

export default function SettingsLayout() {
  const location = useLocation()

  return (
    <DashboardLayout>
        <div className="bg-white pt-8 px-6 rounded-t-[16px] border-b border-b-[#E9E9E9]">
          <Tabs
            tabs={[
                { label: "Profile", key: "/settings/profile" },
                { label: "Management", key: `/settings/management` }, 
                { label: "Team", key: "/settings/team" },
                { label: "Others", key: "/settings/others" },
            ]}
            useAsLink
          />
        </div>
        <div 
          className={clsx(
            "py-8 bg-white rounded-b-[16px] h-fit",
            location.pathname === "/settings/others" && "mb-[100px]"
          )}
        >
          <Outlet />
        </div>
    </DashboardLayout>
  );
}