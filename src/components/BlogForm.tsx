import { useState, useRef } from "react";
import Input from "./Form/Input";
import Select from "./Form/Select";
import TextArea from "./Form/TextArea";
import ImageItem from "./ImageItem";
import { UploadIcon } from "../icons/icons";
import { PlusIcon } from "lucide-react";
import Button from "./shared/Button";
import { useFileUpload } from "../utils/hooks/useFileUpload";
import InnerLayout from "../pages/dashboard/blogs/inner-layout";

interface BlogData {
  category: string;
  title: string;
  content: string;
  images: string[]; // URLs of existing images
}

interface BlogFormProps {
  mode: "create" | "edit";
  initialData?: BlogData;
  onSubmit: (formData: FormData) => void;
  onDelete?: () => void;
  isLoading?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({
  mode,
  initialData,
  onSubmit,
  onDelete,
  isLoading = false,
}) => {
  // File upload hook for new images
  const fileUpload = useFileUpload({
    accept: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"],
    maxSizeKb: 2 * 1024, // 2MB
    multiple: true,
    maxFiles: 10, // Maximum 5 images
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<any>(null); // Ref for TextArea editor

  // Track deleted images
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  // Example options for the category select
  const categoryOptions = [
    { value: "rap-battle", label: "Rap Battle" },
    { value: "artists", label: "Artists" },
    { value: "investors", label: "Investors" },
  ];

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = (index: number) => {
    fileUpload.removeFile(index);
  };

  const handleExistingImageRemove = (imageUrl: string) => {
    setDeletedImages((prev) => [...prev, imageUrl]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    // Create FormData from the form
    const formData = new FormData(formRef.current);

    // Add new images as an array
    fileUpload.files.forEach((file, index) => {
      formData.append(`picture[${index}]`, file);
    });

    // Add deleted images
    deletedImages.forEach((imageUrl, index) => {
      formData.append(`deletedImages[${index}]`, imageUrl);
    });

    // Get HTML content from TextArea editor
    if (textAreaRef.current?.editor) {
      const htmlContent = textAreaRef.current.editor.getHTML();
      formData.set("content", htmlContent);
    }

    onSubmit(formData);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <InnerLayout title={mode === "create" ? "Create Blog" : "Edit Blog"}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10 mb-10">
          <div className="space-y-5 lg:w-[56%]">
            <Select
              label="Category"
              id="category"
              placeholder="Select Category"
              options={categoryOptions}
              defaultValue={initialData?.category}
            />
            <Input
              label="Post Title"
              id="title"
              placeholder="Text"
              defaultValue={initialData?.title}
            />
            <TextArea
              ref={textAreaRef}
              id="content"
              label="Post Content"
              placeholder="Write here..."
              minHeight={200}
              value={initialData?.content}
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
              accept="image/*"
              multiple
              onChange={fileUpload.handleFileInput}
              className="hidden"
            />

            {/* Image Gallery */}
            <div className="flex items-center gap-3 [&>*]:flex-shrink-0 max-w-full overflow-auto">
              {/* Display existing images */}
              {initialData?.images?.map((imageUrl, index) => (
                <ImageItem
                  key={`existing-${index}`}
                  src={imageUrl}
                  alt={`Existing image ${index + 1}`}
                  onRemove={() => handleExistingImageRemove(imageUrl)}
                />
              ))}

              {/* Display uploaded files */}
              {fileUpload.files.map((file, index) => (
                <ImageItem
                  key={`uploaded-${index}`}
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded image ${index + 1}`}
                  onRemove={() => handleImageRemove(index)}
                />
              ))}

              {/* Add Photo Button - Always show on mobile, only show on lg when we have at least 1 image */}
              <button
                type="button"
                className={`w-[147px] h-[100px] rounded-lg flex items-center justify-center border border-dashed border-[#999999] cursor-pointer hover:border-brand-500 transition-colors duration-200 ${
                  (initialData?.images?.length || 0) + fileUpload.files.length >
                  0
                    ? "lg:flex"
                    : "lg:hidden"
                }`}
                onClick={handleBrowseFiles}
              >
                <div className="space-y-3 text-center">
                  <PlusIcon className="mx-auto" />
                  <p className="text-grey-normal">Add Photo</p>
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

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            text={mode === "create" ? "Create Post" : "Update Post"}
            type="submit"
            extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
            isLoading={isLoading}
          />

          {mode === "edit" && onDelete && (
            <Button
              text="Delete Post"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 bg-red-light !text-red-normal !rounded-[8px] !font-bold"
              onClick={handleDelete}
              disabled={isLoading}
            />
          )}
        </div>
      </form>
    </InnerLayout>
  );
};

export default BlogForm;
