import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import AnnouncementInnerLayout from "./announcements/inner-layout";
import Button from "../../../components/shared/Button";
import StateContainer from "../../../components/shared/StateContainer";
import { useAnnouncementDraft } from "./announcements/announcement-draft-context";
import { createAnnouncement, updateAnnouncement } from "./announcements/data";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHelpers";
import AnnouncementViewLayout from "./announcements/announcement-view-layout";
import { combineDateTime } from "../../../utils/helpers";
import { useProfile } from "../../../context/ProfileContext";
import FixedFooter from "../../../components/shared/FixedFooter";

const PreviewAnnouncement = () => {
  const { draft } = useAnnouncementDraft();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile } = useProfile();

  const {
    title,
    status,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    announcementId,
    image,
    newImage,
    creator,
  } = useMemo(() => {
    return (
      draft?.data || {
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
      }
    );
  }, [draft]);

  const handleContinueEditing = () => {
    navigate(-1);
  };

  const handlePrimaryAction = async () => {
    if (!draft) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("description", description);
      formData.set("status", status);
      formData.set("start_date", combineDateTime(startDate, startTime));
      formData.set("end_date", combineDateTime(endDate, endTime));

      if (newImage && newImage.length > 0) {
        formData.append("picture", newImage[0]);
      }
      if (draft.mode === "create") {
        await createAnnouncement(formData);
        toast.success("Announcement created");
        // Invalidate the announcement list query to refetch updated data
        await queryClient.invalidateQueries({
          queryKey: ["/admin/announcement"],
        });
        navigate("/rap-battle/announcement");
      } else {
        const targetAnnouncementId = announcementId;
        if (targetAnnouncementId) {
          formData.set("id", String(targetAnnouncementId));
        }
        await updateAnnouncement(formData);
        toast.success("Announcement updated");
        // Invalidate both the list and details queries to refetch updated data
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["/admin/announcement"],
          }),
          queryClient.invalidateQueries({
            queryKey: [
              "/admin/announcement/details",
              { id: targetAnnouncementId },
            ],
          }),
        ]);
        navigate(`/rap-battle/announcement/${announcementId}`, {
          replace: true,
        });
      }
    } catch (error: any) {
      toast.error(handleApiError(error, "Failed to save announcement"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnnouncementInnerLayout title="Preview">
      {!draft ? (
        <StateContainer>
          <p className="text-gray-600">
            No blog data found to preview. Please go back and fill the form
            first.
          </p>
        </StateContainer>
      ) : (
        <div className="pb-[95px]">
          <AnnouncementViewLayout
            title={title}
            description={description}
            startDate={startDate}
            startTime={startTime}
            endDate={endDate}
            endTime={endTime}
            image={
              newImage && newImage.length > 0
                ? URL.createObjectURL(newImage[0])
                : image || ""
            }
            creatorName={
              draft.mode === "create"
                ? `${profile?.first_name ?? ""} ${
                    profile?.last_name ?? ""
                  }`.trim() || "Admin"
                : creator?.name
            }
            creatorAvatar={
              draft.mode === "create"
                ? profile?.profile_picture_url || profile?.profile_pic || ""
                : creator?.profile_picture_url || creator?.profile_pic || ""
            }
          />

          {/* Bottom action bar - Fixed footer */}
          <FixedFooter>
            <Button
              text="Continue Editing"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold !bg-transparent !text-grey-normal border border-[#E9E9E9]"
              onClick={handleContinueEditing}
            />
            <Button
              text={
                draft.mode === "create" ? "Create Announcement" : "Save Changes"
              }
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              isLoading={isSubmitting}
              onClick={handlePrimaryAction}
            />
          </FixedFooter>
        </div>
      )}
    </AnnouncementInnerLayout>
  );
};

export default PreviewAnnouncement;
