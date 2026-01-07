import { Outlet } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import { BeatDraftProvider } from "./beat-draft-context";

export default function BeatsLayout() {
  return (
    <DashboardLayout>
      <BeatDraftProvider>
        <Outlet />
      </BeatDraftProvider>
    </DashboardLayout>
  );
}
