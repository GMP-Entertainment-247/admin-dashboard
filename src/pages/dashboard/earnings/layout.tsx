import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function EarningsLayout() {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  );
}