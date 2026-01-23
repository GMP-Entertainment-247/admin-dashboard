import BlogInnerLayout from "./inner-layout";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { toast } from "react-toastify";
import Button from "../../../components/shared/Button";
import BlogViewLayout from "../../../components/BlogViewLayout";
import { type CommentProps } from "../../../components/Comment";
import type { BlogDetailsData } from "../../../interface/blog.interface";
import { deleteBlog } from "./data";
import useFetch from "../../../utils/hooks/useFetch";
import {
  flattenErrorMessage,
  handleApiError,
} from "../../../utils/errorHelpers";
import FixedFooter from "../../../components/shared/FixedFooter";

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const {
    data: blogData,
    loading,
    error,
  } = useFetch<BlogDetailsData | null>("/admin/blog/details", {
    blog_id: blogId,
  });

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

  const handleDelete = async () => {
    if (!blogId) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (!confirmed) return;
    try {
      const res = await deleteBlog(blogId);
      if (!res.status) {
        toast.error(flattenErrorMessage(res.message, "Failed to delete blog"));
        return;
      }
      toast.success("Blog deleted successfully");
      navigate("/blogs");
    } catch (error) {
      toast.error(handleApiError(error, "Failed to delete blog"));
    }
  };

  return (
    <BlogInnerLayout title="Details">
      {loading ? (
        <LoadingSpinner message="Loading blog..." />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading blog</p>
          <p className="text-gray-600">{error.message}</p>
        </StateContainer>
      ) : (
        <div className="pb-[95px]">
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
          <FixedFooter>
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
          </FixedFooter>
        </div>
      )}
    </BlogInnerLayout>
  );
};

export default BlogDetails;
