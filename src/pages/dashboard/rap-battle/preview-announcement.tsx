import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnnouncementInnerLayout from "./announcements/inner-layout";
import Button from "../../../components/shared/Button";
import StateContainer from "../../../components/shared/StateContainer";
import { useAnnouncementDraft } from "./announcements/announcement-draft-context";
import { createAnnouncement } from "./announcements/data";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHelpers";
import AnnouncementViewLayout from "./announcements/announcement-view-layout";
import { combineDateTime } from "../../../utils/helpers";

const PreviewAnnouncement = () => {
  const { draft } = useAnnouncementDraft();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      formData.set("status", status.toLowerCase() === "active" ? "1" : "0");
      formData.set("start_date", combineDateTime(startDate, startTime));
      formData.set("end_date", combineDateTime(endDate, endTime));

      if (newImage && newImage.length > 0) {
        formData.append("picture", newImage[0]);
      }
      if (draft.mode === "create") {
        await createAnnouncement(formData);
        toast.success("Announcement created");
      } else {
        // const targetAnnouncementId = announcementId;
        // if (targetAnnouncementId) {
        //   formData.set("announcement_id", String(targetAnnouncementId));
        // }
        // await updateAnnouncement(formData);
        // toast.success("Announcement updated");
      }
      if (draft.mode === "create") {
        navigate("/rap-battle/announcement");
      } else {
        navigate(`/rap-battle/announcement/${announcementId}`);
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
        <>
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
          />

          {/* Bottom action bar */}
          <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
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
          </div>
        </>
      )}
    </AnnouncementInnerLayout>
  );
};

export default PreviewAnnouncement;
