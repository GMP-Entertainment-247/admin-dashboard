import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import Tabs from "../../../components/shared/Tabs";

export default function SettingsLayout() {
  return (
    <DashboardLayout>
        <div className="bg-white p-8 rounded-t-[16px] ">
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
        <div className="pb-8 bg-white rounded-b-[16px]">
          <Outlet />
        </div>
    </DashboardLayout>
  );
}