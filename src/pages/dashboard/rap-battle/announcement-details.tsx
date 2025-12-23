import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnnouncementInnerLayout from "./announcements/inner-layout";
import Button from "../../../components/shared/Button";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import AnnouncementViewLayout from "./announcements/announcement-view-layout";
import useFetch from "../../../utils/hooks/useFetch";
import type { Announcement } from "../../../interface/announcement.interface";
import {
  flattenErrorMessage,
  handleApiError,
} from "../../../utils/errorHelpers";
import { deleteAnnouncement } from "./announcements/data";

const AnnouncementDetails = () => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const navigate = useNavigate();

  const {
    data: announcementData,
    loading,
    error,
  } = useFetch<Announcement | null>("/admin/announcement/details", {
    id: announcementId,
  });

  const splitDateTime = (value?: string | null) => {
    if (!value) return { date: "", time: "" };
    const [date, time] = value.split(" ");
    return { date: date || "", time: time || "" };
  };

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
      const res = await deleteAnnouncement(announcementId);
      if (!res.status) {
        toast.error(
          flattenErrorMessage(res.message, "Failed to delete announcement")
        );
        return;
      }
      toast.success("Announcement deleted successfully");
      navigate("/rap-battle/announcement");
    } catch (error) {
      toast.error(handleApiError(error, "Failed to delete announcement"));
    }
  };
  return (
    <AnnouncementInnerLayout title="Details">
      {loading ? (
        <LoadingSpinner message="Loading announcement..." />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading announcement</p>
          <p className="text-gray-600">{error.message}</p>
        </StateContainer>
      ) : (
        <>
          <AnnouncementViewLayout
            title={announcementData?.title || ""}
            description={announcementData?.description || ""}
            startDate={splitDateTime(announcementData?.start_date).date}
            startTime={splitDateTime(announcementData?.start_date).time}
            endDate={splitDateTime(announcementData?.end_date).date}
            endTime={splitDateTime(announcementData?.end_date).time}
            image={announcementData?.image || ""}
            creatorName={announcementData?.creator?.name}
            creatorAvatar={
              announcementData?.creator?.profile_picture_url ||
              announcementData?.creator?.profile_pic ||
              ""
            }
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
