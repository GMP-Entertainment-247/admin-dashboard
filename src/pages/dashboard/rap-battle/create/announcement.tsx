import { useEffect } from "react";
import AnnouncementForm from "../../../../components/AnnouncementForm";
import { useAnnouncementDraft } from "../announcements/announcement-draft-context";

export default function CreateAnnouncement() {
  const { draft, setDraft } = useAnnouncementDraft();

  useEffect(() => {
    if (draft?.mode === "create" && draft.data) return;
    setDraft({
      mode: "create",
      data: {
        title: "",
        status: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        description: "",
        image: "",
        newImage: [],
        announcementId: undefined,
      },
    });
  }, [draft, setDraft]);

  return <AnnouncementForm />;
}
