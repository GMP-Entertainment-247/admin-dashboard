import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function BeatsLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
