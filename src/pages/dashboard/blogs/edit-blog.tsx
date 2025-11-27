import BlogForm from "../../../components/BlogForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogDetails } from "./data";
import { toast } from "react-toastify";
import { flattenErrorMessage } from "../../../utils/errorHelpers";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { useBlogDraft } from "./BlogDraftContext";

interface BlogData {
  category: string;
  title: string;
  content: string;
  images: { id: number; file: string }[];
}

const EditBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<BlogData | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { setDraft } = useBlogDraft();

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

  const handlePreview = (formData: FormData) => {
    if (!blogId) return;
    setDraft({
      mode: "edit",
      formData,
    });
    navigate("/blogs/preview");
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
      onSubmit={handlePreview}
      onCancel={() => navigate(-1)}
      blogId={blogId}
    />
  );
};

export default EditBlog;
