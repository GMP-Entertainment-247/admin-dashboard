import Tabs from "../../components/shared/Tabs";
import DashboardLayout from "./DashboardLayout";
import Profile from "../../pages/dashboard/profile";

export default function Settings () {
    return (
        <DashboardLayout>
            <div className="bg-white p-8 rounded-t-[16px]">
                <Tabs
                    tabs={[
                        { label: "Profile", key: "profile" },
                        { label: "Management", key: `management` },
                        { label: "Team", key: "team" },
                        { label: "Others", key: "others" },
                    ]}
                />
            </div>
            <div className=" ">
                <Profile />
            </div>
        </DashboardLayout>
    )
}