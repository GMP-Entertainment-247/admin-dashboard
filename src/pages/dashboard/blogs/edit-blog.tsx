import BlogForm from "../../../components/BlogForm";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { useBlogDraft } from "./BlogDraftContext";
import useFetch from "../../../utils/hooks/useFetch";
import type { BlogDetailsData } from "../../../interface/blog.interface";
import { useEffect } from "react";

const EditBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const { draft, setDraft } = useBlogDraft();

  const shouldUseDraft =
    draft?.mode === "edit" &&
    draft.data.blogId?.toString() === (blogId ?? "").toString();

  const {
    data: fetchedData,
    loading,
    error,
  } = useFetch<BlogDetailsData | null>(
    "/admin/blog/details",
    {
      blog_id: blogId,
    },
    { enabled: !shouldUseDraft }
  );

  // Seed draft from API when needed
  useEffect(() => {
    if (shouldUseDraft || !fetchedData) return;
    setDraft({
      mode: "edit",
      data: {
        category: fetchedData.category || "",
        title: fetchedData.title || "",
        content: fetchedData.content || "",
        existingImages:
          fetchedData.pictures?.map((p) => ({
            id: String(p.id),
            file: p.file,
          })) || [],
        newImages: [],
        deletedImageIds: [],
        blogId: fetchedData.id,
        comments: fetchedData.comments,
        likes: fetchedData.likes,
      },
    });
  }, [fetchedData, shouldUseDraft, setDraft]);

  if (loading) {
    return <LoadingSpinner message="Loading blog..." />;
  }

  if (error) {
    return (
      <StateContainer>
        <p className="text-red-600 mb-4">Error loading blog details</p>
        <p className="text-gray-600">
          {error.message || "Something went wrong"}
        </p>
      </StateContainer>
    );
  }
  if (!fetchedData && !draft) {
    return (
      <StateContainer>
        <p className="text-gray-600">Blog not found</p>
      </StateContainer>
    );
  }

  return <BlogForm />;
};

export default EditBlog;
