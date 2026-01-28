import { useRef, useMemo } from "react";
import Input from "./Form/Input";
import Select from "./Form/Select";
import TextArea from "./Form/TextArea";
import MediaItem from "./MediaItem";
import { UploadIcon } from "../icons/icons";
import { PlusIcon } from "lucide-react";
import Button from "./shared/Button";
import { useFileUpload } from "../utils/hooks/useFileUpload";
import InnerLayout from "../pages/dashboard/blogs/inner-layout";
import { BLOG_CATEGORIES } from "../pages/dashboard/blogs/data";
import { useBlogDraft } from "../pages/dashboard/blogs/BlogDraftContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FixedFooter from "./shared/FixedFooter";

const BlogForm: React.FC = () => {
  const { draft, setDraft } = useBlogDraft();
  const navigate = useNavigate();
  const mode = draft?.mode || "create";

  const {
    category,
    title,
    content,
    existingMedia,
    newMedia,
  } = useMemo(() => {
    return (
      draft?.data || {
        category: "",
        title: "",
        content: "",
        existingMedia: [],
        newMedia: [],
        deletedMediaIds: [],
      }
    );
  }, [draft]);
  // console.log(content);
  const fileUpload = useFileUpload({
    accept: ["image/jpeg", "image/jpg", "image/png", "video/mp4"],
    maxSizeKb: 5 * 1024, // 5MB
    multiple: true,
    maxFiles: 5, 
    initialFiles: newMedia,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<any>(null); // Ref for TextArea editor

  const resolvedCategoryOptions = BLOG_CATEGORIES;

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleNewMediaRemove = (index: number) => {
    fileUpload.removeFile(index);

    // Sync with draft immediately
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          newMedia: fileUpload.files.filter((_, i) => i !== index),
        },
      };
    });
  };

  const handleExistingMediaRemove = (m: { id: string; file: string }) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          existingMedia: prev.data.existingMedia.filter((x) => x.id !== m.id),
          deletedMediaIds: Array.from(
            new Set([...(prev.data.deletedMediaIds || []), String(m.id)])
          ),
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const derivedCategory = (formData.get("category") as string) || "";
    const derivedTitle = (formData.get("title") as string) || "";
    const derivedContent =
      (textAreaRef.current?.editor?.getHTML?.() as string) ||
      (formData.get("content") as string) ||
      "";

    const stripHtml = (html: string) =>
      html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();

    const plainContent = stripHtml(derivedContent);

    const hasMedia =
      existingMedia.length > 0 ||
      fileUpload.files.length > 0 ||
      (newMedia && newMedia.length > 0);

    const missingFields: string[] = [];
    if (!derivedCategory.trim()) missingFields.push("Category");
    if (!derivedTitle.trim()) missingFields.push("Post Title");
    if (!plainContent) missingFields.push("Post Content");

    if (!hasMedia) {
      toast.error("Please upload at least one image or video for this post.");
      return;
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill: ${missingFields.join(", ")}`);
      return;
    }

    if (plainContent.length < 20) {
      toast.error("Post content must be at least 20 characters.");
      return;
    }

    setDraft((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        data: {
          ...prev.data,
          category: derivedCategory,
          title: derivedTitle,
          content: derivedContent,
          newMedia: fileUpload.files,
        },
      };
    });

    navigate("/blogs/preview");
  };

  return (
    <InnerLayout title={mode === "create" ? "Create Blog" : "Edit Blog"}>
      <form ref={formRef} onSubmit={handleSubmit} className="pb-[95px]">
        <div className="bg-white p-5 rounded-2xl">
          <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10 mb-10">
            <div className="space-y-5 lg:w-[56%]">
              <Select
                label="Category"
                id="category"
                placeholder="Select Category"
                options={resolvedCategoryOptions}
                value={category}
              />
              <Input
                label="Post Title"
                id="title"
                placeholder="Text"
                defaultValue={title}
              />
              <TextArea
                ref={textAreaRef}
                id="content"
                label="Post Content"
                placeholder="Write here..."
                minHeight={200}
                value={content}
              />
            </div>

            <div className="lg:flex-1 space-y-7 lg:space-y-10 overflow-hidden">
              {/* Drag and Drop Area */}
              <div
                className={`h-[259px] items-center justify-center border border-dashed rounded-lg lg:mt-[42px] hidden lg:flex cursor-pointer transition-colors duration-200 ${
                  fileUpload.isDragOver
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

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/mp4"
                multiple
                onChange={fileUpload.handleFileInput}
                className="hidden"
              />

              {/* Media Gallery */}
              <div className="flex items-center gap-3 [&>*]:flex-shrink-0 max-w-full overflow-auto">
                {/* Display existing media */}
                {existingMedia.map((m, index) => (
                  <MediaItem
                    key={`existing-${index}`}
                    src={m.file}
                    alt={`Existing media ${index + 1}`}
                    isVideo={m.type === "video"}
                    onRemove={() => handleExistingMediaRemove(m)}
                    // hideRemove={

                    // }
                  />
                ))}

                {/* Display uploaded files */}
                {fileUpload.files.map((file, index) => (
                  <MediaItem
                    key={`uploaded-${index}`}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded file ${index + 1}`}
                    isVideo={file.type.startsWith("video/")}
                    onRemove={() => handleNewMediaRemove(index)}
                    // hideRemove={false}
                  />
                ))}

                {/* Add Photo Button - Always show on mobile, only show on lg when we have at least 1 media */}
                <button
                  type="button"
                  className={`w-[147px] h-[100px] rounded-lg flex items-center justify-center border border-dashed border-[#999999] cursor-pointer hover:border-brand-500 transition-colors duration-200 ${
                    existingMedia.length + fileUpload.files.length > 0
                      ? "lg:flex"
                      : "lg:hidden"
                  }`}
                  onClick={handleBrowseFiles}
                >
                  <div className="space-y-3 text-center">
                    <PlusIcon className="mx-auto" />
                    <p className="text-grey-normal">Add Media</p>
                  </div>
                </button>
              </div>

              {/* Error Display */}
              {fileUpload.error && (
                <div className="text-red-500 text-sm mt-2">
                  {fileUpload.error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed footer */}
        <FixedFooter>
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
        </FixedFooter>
      </form>
    </InnerLayout>
  );
};

export default BlogForm;
