import BlogForm from "../../../components/BlogForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogDetails, updateBlog, deleteBlogImage } from "./data";
import { toast } from "react-toastify";
import { flattenErrorMessage } from "../../../utils/errorHelpers";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";

interface BlogData {
  category: string;
  title: string;
  content: string;
  images: { id: number; file: string }[];
}

const EditBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState<BlogData | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoadingData(true);
        if (!blogId) return;
        const response = await getBlogDetails(blogId);
        if (response.status && response.data) {
          const mapped: BlogData = {
            category: response.data.category,
            title: response.data.title,
            content: response.data.content,
            images: (response.data.pictures || []).map((p) => ({
              id: p.id,
              file: p.file,
            })),
          };
          setBlogData(mapped);
        } else {
          const errorMessage = flattenErrorMessage(
            response.message,
            "Failed to load blog"
          );
          toast.error(errorMessage);
        }
      } catch (error) {
        const errorMessage = (error as any)?.response?.data?.message
          ? flattenErrorMessage(
              (error as any).response.data.message,
              "Failed to load blog"
            )
          : "Failed to load blog";
        toast.error(errorMessage);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (blogId) {
      fetchBlogData();
    }
  }, [blogId]);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      // Proceed with update first (so backend sees at least one image if new ones were added)
      const response = await updateBlog(formData);
      if (response.status) {
        toast.success(
          (response.message as string) || "Blog updated successfully"
        );

        // After successful update, delete any images that were removed in the UI
        const ids: string[] = [];
        for (const [key, value] of Array.from(formData.entries())) {
          if (key.startsWith("deleted_image_ids")) ids.push(String(value));
        }

        if (ids.length > 0) {
          for (const id of ids) {
            try {
              await deleteBlogImage(Number(id));
            } catch (e) {
              // Surface but do not block navigation
              toast.error("Failed to delete an image after update");
            }
          }
        }

        navigate("/blogs");
      } else {
        const errorMessage = flattenErrorMessage(response.message);
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message
        ? flattenErrorMessage(
            error.response.data.message,
            "An error occurred while updating the blog"
          )
        : "An error occurred while updating the blog";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!blogId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post? This action cannot be undone."
    );
    if (!confirmed) return;

    setIsLoading(true);

    try {
      console.log("Deleting blog with id:", blogId);

      // TODO: Make API call here
      // await deleteBlog(id);
      // console.log('Blog deleted successfully');

      // TODO: Redirect to blogs list or show success message
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return <LoadingSpinner message="Loading blog..." />;
  }

  if (!blogData) {
    return (
      <StateContainer>
        <p className="text-gray-600">Blog not found</p>
      </StateContainer>
    );
  }

  return (
    <BlogForm
      mode="edit"
      initialData={blogData}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isLoading={isLoading}
      blogId={blogId}
    />
  );
};

export default EditBlog;
