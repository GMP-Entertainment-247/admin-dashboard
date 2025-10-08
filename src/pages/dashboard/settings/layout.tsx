import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import Tabs from "../../../components/shared/Tabs";

export default function SettingsLayout() {
  return (
    <DashboardLayout>
        <div className="bg-white p-8 rounded-t-[16px] ">
            <Tabs
            tabs={[
                { label: "Profile", key: "profile" },
                { label: "Management", key: `management` }, 
                { label: "Team", key: "team" },
                { label: "Others", key: "others" },
            ]}
        />
        </div>
        <div className="">
        <Outlet />
        </div>
    </DashboardLayout>
  );
}