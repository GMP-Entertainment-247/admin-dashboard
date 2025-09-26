import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function RapBattleLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
