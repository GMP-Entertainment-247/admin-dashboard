import { Outlet, useLocation } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import Tabs from "../../../components/shared/Tabs";
import Button from "../../../components/shared/Button";
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
            (
              location.pathname === "/settings/others" ||
              location.pathname === "/settings/profile"
            ) && "mb-[100px]"
          )}
        >
          <Outlet />
        </div>
        {/* <div className=" flex justify-end items-center align-middle gap-4 mt-8 mb-5 px-5 h-[83px] bg-white rounded-[16px] ">
                <Button text=" Discard Changes" extraClassName="w-[143px] h-[51px] text-[#FF0000] bg-[#FFE5E5] rounded-2 "/>
                <Button text="Save Changes" extraClassName="w-[143px] h-[51px] bg-[#998100] "/>
            </div> */}
    </DashboardLayout>
  );
}