import { useNavigate } from "react-router-dom";
import { useRef, useMemo } from "react";
import AnnouncementInnerLayout from "../pages/dashboard/rap-battle/announcements/inner-layout";
import {
  useAnnouncementDraft,
  // type AnnouncementDraftData,
} from "../pages/dashboard/rap-battle/announcements/announcement-draft-context";
import Button from "./shared/Button";
import ImageItem from "./ImageItem";
import Input from "./Form/Input";
import Select from "./Form/Select";
import Label from "./Form/Label";
import TextArea from "./Form/TextArea";
import { useFileUpload } from "../utils/hooks/useFileUpload";
import { UploadIcon } from "lucide-react";
import { toast } from "react-toastify";

const AnnouncementForm = () => {
  const { draft, setDraft } = useAnnouncementDraft();
  const navigate = useNavigate();
  const mode = draft?.mode || "create";
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    title,
    status,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
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
      }
    );
  }, [draft]);

  console.log(status);

  const fileUpload = useFileUpload({
    accept: ["image/jpeg", "image/jpg", "image/png"],
    maxSizeKb: 2 * 1024, // 2MB
    initialFiles: newImage,
  });

  const previewImageUrl = useMemo(() => {
    if (fileUpload.files.length > 0) {
      return URL.createObjectURL(fileUpload.files[0]);
    }
    if (newImage && newImage.length > 0) {
      return URL.createObjectURL(newImage[0]);
    }
    if (image) {
      return image;
    }
    return null;
  }, [fileUpload.files, newImage, image]);

  const handleRemoveImage = () => {
    fileUpload.clearFiles();

    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          image: "",
          newImage: [],
        },
      };
    });
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const derivedTitle = (formData.get("title") as string) || "";
    const derivedStatus = (formData.get("status") as string) || "";
    const derivedStartDtate = (formData.get("start-date") as string) || "";
    const derivedStartTime = (formData.get("start-time") as string) || "";
    const derivedEndDate = (formData.get("end-date") as string) || "";
    const derivedEndTime = (formData.get("end-time") as string) || "";
    const derivedDescription =
      (textAreaRef.current?.editor?.getHTML?.() as string) ||
      (formData.get("content") as string) ||
      "";

    const stripHtml = (html: string) =>
      html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

    const plainDescription = stripHtml(derivedDescription);

    const hasImage =
      fileUpload.files.length > 0 ||
      (newImage && newImage.length > 0) ||
      Boolean(image);

    const missingFields: string[] = [];
    if (!derivedTitle.trim()) missingFields.push("Title");
    if (!derivedStatus.trim()) missingFields.push("Status");
    if (!derivedStartDtate) missingFields.push("Start Date");
    if (!derivedStartTime) missingFields.push("Start Time");
    if (!derivedEndDate) missingFields.push("End Date");
    if (!derivedEndTime) missingFields.push("End Time");
    if (!plainDescription) missingFields.push("Description");
    if (!hasImage) missingFields.push("Announcement Image");

    if (missingFields.length > 0) {
      toast.error(`Please fill: ${missingFields.join(", ")}`);
      return;
    }

    if (plainDescription.length < 20) {
      toast.error("Description must be at least 20 characters.");
      return;
    }

    setDraft((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        data: {
          ...prev.data,
          title: derivedTitle,
          status: derivedStatus,
          startDate: derivedStartDtate,
          startTime: derivedStartTime,
          endDate: derivedEndDate,
          endTime: derivedEndTime,
          description: derivedDescription,

          // ✅ FILES SAVED HERE
          ...(fileUpload.files.length > 0 && {
            image: "", // remove old URL if replacing
            newImage: fileUpload.files,
          }),
        },
      };
    });

    navigate("/rap-battle/announcement/preview");
  };

  return (
    <AnnouncementInnerLayout
      title={mode === "create" ? "Create Announcement" : "Edit Announcement"}
    >
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="bg-white p-5 rounded-2xl">
          <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10 mb-10">
            <div className="space-y-5 lg:w-[56%]">
              <Input
                label="Title"
                id="title"
                placeholder="Text"
                defaultValue={title}
              />
              <Select
                label="Status"
                id="status"
                placeholder="Select Status"
                options={[
                  { label: "Active", value: "1" },
                  { label: "Inactive", value: "0" },
                ]}
                value={status}
              />
              <div className="space-y-3">
                <Label id="start">Start Date & Time</Label>
                <div className="flex items-center w-full gap-5">
                  <Input id="start-date" type="date" defaultValue={startDate} />
                  <Input id="start-time" type="time" defaultValue={startTime} />
                </div>
              </div>
              <div className="space-y-3">
                <Label id="start">End Date & Time</Label>
                <div className="flex items-center w-full gap-5">
                  <Input id="end-date" type="date" defaultValue={endDate} />
                  <Input id="end-time" type="time" defaultValue={endTime} />
                </div>
              </div>
              <TextArea
                ref={textAreaRef}
                id="description"
                label="Description"
                placeholder="Write here..."
                minHeight={200}
                value={description}
              />
            </div>

            <div className="w-full lg:w-[unset] lg:flex-1 space-y-7 lg:space-y-10 overflow-hidden self-center">
              {previewImageUrl ? (
                <ImageItem
                  src={previewImageUrl}
                  alt="Announcement image"
                  onRemove={handleRemoveImage}
                  className="w-full h-[259px]"
                  imgClass="object-contain"
                />
              ) : (
                // Drag and Drop Area
                <div
                  className={`h-[259px] items-center justify-center border border-dashed rounded-lg flex cursor-pointer transition-colors duration-200 ${fileUpload.isDragOver
                      ? "border-brand-500 bg-brand-50"
                      : "border-[#999999] hover:border-brand-500"
                    }`}
                  onDrop={fileUpload.handleDrop}
                  onDragOver={fileUpload.handleDragOver}
                  onDragLeave={fileUpload.handleDragLeave}
                  onClick={handleBrowseFiles}
                >
                  <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto" />
                    <p className="mb-2">Drag & drop to upload or</p>
                    <p className="text-[#998100]">Browse Files</p>
                  </div>
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={fileUpload.handleFileInput}
                className="hidden"
              />

              {/* Error Display */}
              {fileUpload.error && (
                <div className="text-red-500 text-sm mt-2">
                  {fileUpload.error}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Action Buttons - separate container at the bottom */}
        <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
          {mode === "edit" && (
            <Button
              text="Cancel"
              variant="cancel"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={() => navigate(-1)}
            />
          )}
          <Button
            text="Preview"
            type="submit"
            extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
          />
        </div>
      </form>
    </AnnouncementInnerLayout>
  );
};

export default AnnouncementForm;
