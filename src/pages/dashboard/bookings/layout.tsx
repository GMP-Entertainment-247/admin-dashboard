import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function BookingsLayout() {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  );
}