import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import useFetch from "../../../utils/hooks/useFetch";
import AnnouncementInnerLayout from "./announcements/inner-layout";
import Button from "../../../components/shared/Button";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
// import type { Announcement } from "../../../interface/announcement.interface";
import StateContainer from "../../../components/shared/StateContainer";
import AnnouncementViewLayout from "./announcements/announcement-view-layout";
import { useMockFetchAnnouncement } from "./announcements/data";
// import { flattenErrorMessage, handleApiError } from "../../../utils/errorHelpers";

// import { mockAnnouncements } from "./announcements/data";

const AnnouncementDetails = () => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const navigate = useNavigate();
  // const {
  //   data: announcementData,
  //   loading,
  //   error,
  // } = useFetch<Announcement | null>("/admin/blog/details", {
  //   blog_id: announcementId,
  // });

  const {
    data: announcementData,
    loading,
    error,
  } = useMockFetchAnnouncement(announcementId);

  const handleEdit = () => {
    if (!announcementId) return;
    navigate("edit");
  };

  const handleDelete = async () => {
    if (!announcementId) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );
    if (!confirmed) return;
    try {
      //   const res = await deleteAnnouncement(blogId);
      //   if (!res.status) {
      //     toast.error(flattenErrorMessage(res.message, "Failed to delete blog"));
      //     return;
      //   }
      toast.success("Announcement deleted successfully");
      navigate("/rap-battle/announcement");
    } catch (error) {
      //   toast.error(handleApiError(error, "Failed to delete blog"));
    }
  };
  return (
    <AnnouncementInnerLayout title="Details">
      {loading ? (
        <LoadingSpinner message="Loading announcement..." />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading blog</p>
          <p className="text-gray-600">{error.message}</p>
        </StateContainer>
      ) : (
        <>
          <AnnouncementViewLayout
            title={announcementData?.title || ""}
            description={announcementData?.description || ""}
            startDate={announcementData?.startDate || ""}
            startTime={announcementData?.startTime || ""}
            endDate={announcementData?.endDate || ""}
            endTime={announcementData?.endTime || ""}
            image={announcementData?.image || ""}
          />

          {/* Bottom action bar */}
          <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
            <Button
              text="Delete Announcement"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleDelete}
              variant="cancel"
            />
            <Button
              text="Edit Announcement"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleEdit}
            />
          </div>
        </>
      )}
    </AnnouncementInnerLayout>
  );
};

export default AnnouncementDetails;
