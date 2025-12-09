import BlogInnerLayout from "./inner-layout";
import { getBlogDetails } from "./data";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { toast } from "react-toastify";
import { flattenErrorMessage } from "../../../utils/errorHelpers";
import Button from "../../../components/shared/Button";
import BlogViewLayout from "../../../components/BlogViewLayout";
import { type CommentProps } from "../../../components/Comment";
import type { BlogDetailsData } from "../../../interface/blog.interface";

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogData, setBlogData] = useState<BlogDetailsData | null>(null);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (!blogId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getBlogDetails(blogId);
        if (response.status && response.data) {
          if (!isMounted) return;
          setBlogData(response.data);
        } else {
          toast.error("Failed to load blog details");
          if (isMounted) setError("Failed to load blog details");
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message
          ? flattenErrorMessage(
              err.response.data.message,
              "Failed to load blog details"
            )
          : "Failed to load blog details";
        toast.error(errorMessage);
        if (isMounted) setError(errorMessage);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [blogId]);

  // Transform blog data for BlogViewLayout
  const { title, content, images, likes, comments } = (() => {
    if (!blogData) {
      return {
        title: "",
        content: "",
        images: [] as string[],
        likes: 0,
        comments: [] as CommentProps[],
      };
    }

    const mappedImages = blogData.pictures?.map((p) => p.file) || [];

    const mappedComments: CommentProps[] =
      blogData.comments?.map((c) => ({
        id: String(c.id),
        name: c.user?.name || "Anonymous",
        text: c.comment,
        likes: 0, // Individual comment likes not tracked in current structure
        dislikes: 0,
        profile_picture:
          c.user?.profile_picture_url || c.user?.profile_pic || "",
        timestamp: c.created_at,
        replies: [], // Ignoring nested comments for now
      })) || [];

    return {
      title: blogData.title,
      content: blogData.content || "",
      images: mappedImages,
      likes: blogData.likes?.length || 0,
      comments: mappedComments,
    };
  })();

  const handleEdit = () => {
    if (!blogId) return;
    navigate(`/blogs/edit-blog/${blogId}`);
  };

  const handleDelete = () => {
    // TODO: Wire to real delete endpoint when available
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (!confirmed) return;
    toast.info("Delete blog functionality is not implemented yet.");
  };

  return (
    <BlogInnerLayout title="Details">
      {loading ? (
        <LoadingSpinner message="Loading blog..." />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading blog</p>
          <p className="text-gray-600">{error}</p>
        </StateContainer>
      ) : (
        <>
          <BlogViewLayout
            title={title}
            content={content}
            images={images}
            likes={likes}
            comments={comments}
            disableActions={false}
            noCommentsMessage="No comments to display."
          />

          {/* Bottom action bar */}
          <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
            <Button
              text="Delete Post"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleDelete}
              variant="cancel"
            />
            <Button
              text="Edit Post"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleEdit}
            />
          </div>
        </>
      )}
    </BlogInnerLayout>
  );
};

export default BlogDetails;
