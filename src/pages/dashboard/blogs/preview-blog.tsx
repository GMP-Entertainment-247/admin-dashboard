import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogInnerLayout from "./inner-layout";
import image from "../../../images/rap-battle.jpg";
import PostActions from "../../../components/PostActions";
import Button from "../../../components/shared/Button";
import StateContainer from "../../../components/shared/StateContainer";
import { useBlogDraft } from "./BlogDraftContext";

const PreviewBlog = () => {
  const { draft } = useBlogDraft();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { title, content, images } = useMemo(() => {
    if (!draft) {
      return { title: "", content: "", images: [] as string[] };
    }

    const formData = draft.formData;
    const derivedTitle = (formData.get("title") as string) || "";
    const derivedContent = (formData.get("content") as string) || "";

    const derivedImages: string[] = [];
    for (const [key, value] of Array.from(formData.entries())) {
      if (key.startsWith("picture[") && value instanceof File) {
        derivedImages.push(URL.createObjectURL(value));
      }
    }

    return {
      title: derivedTitle,
      content: derivedContent,
      images: derivedImages,
    };
  }, [draft]);

  const imagesToShow =
    images.length > 0 ? images : [image, image, image].slice(0, 3);

  const handleMakeChanges = () => {
    navigate(-1);
  };

  const handlePrimaryAction = async () => {
    if (!draft) return;
    setIsSubmitting(true);
    try {
      // The actual API submission is still handled on the form page.
      // For now, simply navigate back to the blogs list.
      navigate("/blogs");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!draft) {
    return (
      <BlogInnerLayout title="Preview">
        <StateContainer>
          <p className="text-gray-600">
            No blog data found to preview. Please go back and fill the form
            first.
          </p>
        </StateContainer>
      </BlogInnerLayout>
    );
  }

  return (
    <BlogInnerLayout title="Preview">
      <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10">
        <article className="lg:w-[56%]">
          <h3 className="text-sm md:text-base font-semibold text-grey-normal mb-5 line-clamp-2">
            {title}
          </h3>
          <div
            className="text-xs md:text-sm text-grey-normal font-normal mb-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <PostActions likes={10} dislikes={2} comments={10} />
        </article>
        <aside className="lg:flex-1 space-y-10 lg:mt-4">
          <div className="w-full flex gap-3">
            {imagesToShow.slice(0, 3).map((src, idx) => (
              <div
                key={idx}
                className="flex-1 aspect-[1.47] rounded-lg overflow-hidden relative"
              >
                <img
                  src={typeof src === "string" ? src : image}
                  alt="blog"
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Bottom action bar */}
      <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
        <Button
          text="Make Changes"
          type="button"
          extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold !bg-transparent !text-grey-normal border border-[#E9E9E9]"
          onClick={handleMakeChanges}
        />
        <Button
          text={draft.mode === "create" ? "Create Post" : "Save"}
          type="button"
          extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
          isLoading={isSubmitting}
          onClick={handlePrimaryAction}
        />
      </div>
    </BlogInnerLayout>
  );
};

export default PreviewBlog;
