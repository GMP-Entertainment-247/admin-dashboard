import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function InvestorLayout() {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  );
}