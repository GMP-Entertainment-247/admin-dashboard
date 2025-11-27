import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import { BlogDraftProvider } from "./BlogDraftContext";

export default function BlogsLayout() {
  return (
    <DashboardLayout>
      <BlogDraftProvider>
        <Outlet />
      </BlogDraftProvider>
    </DashboardLayout>
  );
}
