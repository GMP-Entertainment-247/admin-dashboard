import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogInnerLayout from "./inner-layout";
import Button from "../../../components/shared/Button";
import StateContainer from "../../../components/shared/StateContainer";
import { useBlogDraft } from "./BlogDraftContext";
import { createBlog, deleteBlogImage, updateBlog } from "./data";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHelpers";
import BlogViewLayout from "../../../components/BlogViewLayout";
import { type CommentProps } from "../../../components/Comment";
import FixedFooter from "../../../components/shared/FixedFooter";

const PreviewBlog = () => {
  const { draft } = useBlogDraft();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    title,
    content,
    images,
    comments,
    likes,
    blogId,
    deletedIds,
    newFiles,
  } = useMemo(() => {
    if (!draft?.data) {
      return {
        title: "",
        content: "",
        images: [] as string[],
        comments: [] as CommentProps[],
        likes: 0,
        blogId: undefined as string | number | undefined,
        deletedIds: [] as string[],
        newFiles: [] as File[],
      };
    }

    const { data } = draft;
    const filteredExisting =
      data.existingImages?.filter((img) => {
        if (!img.file) return false;
        return !data.deletedImageIds.includes(String(img.id));
      }) || [];

    const derivedImages: string[] = [
      ...filteredExisting.map((img) => img.file),
      ...(data.newImages || []).map((f) => URL.createObjectURL(f)),
    ];

    // Map comments from draft data
    const mappedComments: CommentProps[] =
      data.comments?.map((c: any) => ({
        id: String(c.id),
        name: c.user?.name || "Anonymous",
        text: c.comment,
        likes: 0, // Comments don't have individual like counts in preview
        dislikes: 0,
        profile_picture:
          c.user?.profile_picture_url || c.user?.profile_pic || "",
        timestamp: c.created_at,
        replies: [], // Ignoring nested comments for now
      })) || [];

    return {
      title: data.title,
      content: data.content,
      images: derivedImages,
      comments: mappedComments,
      likes: data.likes?.length || 0,
      blogId: data.blogId,
      deletedIds: data.deletedImageIds || [],
      newFiles: data.newImages || [],
    };
  }, [draft]);

  const handleContinueEditing = () => {
    navigate(-1);
  };

  const handlePrimaryAction = async () => {
    if (!draft) return;
    setIsSubmitting(true);
    console.log(deletedIds, "line 86");
    try {
      const formData = new FormData();
      formData.set("category", draft.data.category || "");
      formData.set("title", draft.data.title || "");
      formData.set("content", draft.data.content || "");

      if (draft.mode === "create") {
        newFiles.forEach((file, idx) =>
          formData.append(`picture[${idx}]`, file)
        );
        await createBlog(formData);
        toast.success("Blog created");
      } else {
        const targetBlogId = blogId;
        if (targetBlogId) {
          formData.set("blog_id", String(targetBlogId));
        }
        newFiles.forEach((file, idx) =>
          formData.append(`picture[${idx}]`, file)
        );
        await updateBlog(formData);

        for (const id of deletedIds || []) {
          if (id != null && id !== "") {
            await deleteBlogImage(String(id));
          }
        }
        toast.success("Blog updated");
      }
      if (draft.mode === "create") {
        navigate("/blogs");
      } else {
        navigate(`/blogs/${blogId}`);
      }
    } catch (error: any) {
      toast.error(handleApiError(error, "Failed to save blog"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BlogInnerLayout title="Preview">
      {!draft ? (
        <StateContainer>
          <p className="text-gray-600">
            No blog data found to preview. Please go back and fill the form
            first.
          </p>
        </StateContainer>
      ) : (
        <div className="pb-[95px]">
          <BlogViewLayout
            title={title}
            content={content}
            images={images}
            likes={likes}
            comments={comments}
            disableActions={true}
            noCommentsMessage={
              draft.mode === "create"
                ? "No comments yet. Create the post to start collecting feedback."
                : "No comments to display."
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
              text={draft.mode === "create" ? "Create Post" : "Save Changes"}
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              isLoading={isSubmitting}
              onClick={handlePrimaryAction}
            />
          </FixedFooter>
        </div>
      )}
    </BlogInnerLayout>
  );
};

export default PreviewBlog;
