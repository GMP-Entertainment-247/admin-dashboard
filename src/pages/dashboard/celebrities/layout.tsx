import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function CelebrityLayout() {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  );
}