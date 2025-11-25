import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

export default function ArtistLayout() {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  );
}