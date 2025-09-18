import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function FansLayout() {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  );
}