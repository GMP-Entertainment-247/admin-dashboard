import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function BlogsLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
