import { useEffect } from "react";
import AnnouncementForm from "../../../components/AnnouncementForm";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { useAnnouncementDraft } from "./announcements/announcement-draft-context";
// import useFetch from "../../../utils/hooks/useFetch";
import { useMockFetchAnnouncement } from "./announcements/data";

const EditAnnouncement = () => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const { draft, setDraft } = useAnnouncementDraft();

  const shouldUseDraft =
    draft?.mode === "edit" &&
    draft.data.announcementId?.toString() === (announcementId ?? "").toString();

  console.log({ shouldUseDraft, draft });

  //   const {
  //     data: fetchedData,
  //     loading,
  //     error,
  //   } = useFetch<BlogDetailsData | null>(
  //     "/admin/blog/details",
  //     {
  //       announcement_Id: announcementId,
  //     },
  //     { enabled: !shouldUseDraft }
  //   );

  const {
    data: fetchedData,
    loading,
    error,
  } = useMockFetchAnnouncement(announcementId, { enabled: !shouldUseDraft });

  // Seed draft from API when needed
  useEffect(() => {
    if (shouldUseDraft || !fetchedData) return;
    setDraft({
      mode: "edit",
      data: {
        announcementId: fetchedData.id,
        title: fetchedData.title || "",
        status: fetchedData.status || "",
        startDate: fetchedData.startDate || "",
        startTime: fetchedData.startTime || "",
        endDate: fetchedData.endDate || "",
        endTime: fetchedData.endTime || "",
        description: fetchedData.description || "",
        image: fetchedData.image || "",
        newImage: [],
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
