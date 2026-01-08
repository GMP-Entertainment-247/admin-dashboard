import { useEffect } from "react";
import AnnouncementForm from "../../../components/AnnouncementForm";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { useAnnouncementDraft } from "./announcements/announcement-draft-context";
import useFetch from "../../../utils/hooks/useFetch";
import type { Announcement } from "../../../interface/announcement.interface";
import { splitDateTime } from "../../../utils/helpers";

const EditAnnouncement = () => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const { draft, setDraft } = useAnnouncementDraft();

  const shouldUseDraft =
    draft?.mode === "edit" &&
    draft.data.announcementId?.toString() === (announcementId ?? "").toString();

  // console.log({ shouldUseDraft, draft });

  const {
    data: fetchedData,
    loading,
    error,
  } = useFetch<Announcement | null>(
    "/admin/announcement/details",
    {
      id: announcementId,
    },
    { enabled: !shouldUseDraft }
  );

  // Seed draft from API when needed
  useEffect(() => {
    if (shouldUseDraft || !fetchedData) return;
    const start = splitDateTime(fetchedData.start_date);
    const end = splitDateTime(fetchedData.end_date);
    setDraft({
      mode: "edit",
      data: {
        announcementId: fetchedData.id,
        title: fetchedData.title || "",
        status: fetchedData.status,
        startDate: start.date,
        startTime: start.time,
        endDate: end.date,
        endTime: end.time,
        description: fetchedData.description || "",
        image: fetchedData.image || "",
        newImage: [],
        creator: fetchedData.creator
      },
    });
  }, [fetchedData, shouldUseDraft, setDraft]);

  if (loading) {
    return <LoadingSpinner message="Loading announcement..." />;
  }

  if (error) {
    return (
      <StateContainer>
        <p className="text-red-600 mb-4">Error loading announcement details</p>
        <p className="text-gray-600">
          {error.message || "Something went wrong"}
        </p>
      </StateContainer>
    );
  }
  if (!fetchedData && !draft) {
    return (
      <StateContainer>
        <p className="text-gray-600">Announcement not found</p>
      </StateContainer>
    );
  }

  return <AnnouncementForm />;
};

export default EditAnnouncement;
