import { Outlet } from "react-router-dom";
import { AnnouncementDraftProvider } from "./announcement-draft-context";

export default function AnnouncementLayout() {
  return (
    <AnnouncementDraftProvider>
      <Outlet />
    </AnnouncementDraftProvider>
  );
}
