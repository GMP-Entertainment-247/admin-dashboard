import BlogForm from "../../../components/BlogForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface BlogData {
  category: string;
  title: string;
  content: string;
  images: string[];
}

const EditBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState<BlogData | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoadingData(true);

        // TODO: Replace with actual API call
        // const response = await getBlogById(id);
        // setBlogData(response.data);

        // Mock data for now
        const mockData: BlogData = {
          category: "tech",
          title: "Sample Blog Post",
          content:
            "<p>This is a sample blog post content with <strong>HTML formatting</strong>.</p>",
          images: [
            "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Image+1",
            "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Image+2",
            "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Image+3",
          ],
        };

        setBlogData(mockData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (blogId) {
      fetchBlogData();
    }
  }, [blogId]);

  const handleSubmit = async (data: {
    category: string;
    title: string;
    content: string;
    newImages: File[];
    deletedImages: string[];
  }) => {
    setIsLoading(true);

    try {
      // Create FormData for API call
      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Add new images
      data.newImages.forEach((file, index) => {
        formData.append(`images`, file);
      });

      // Add deleted image URLs
      data.deletedImages.forEach((imageUrl, index) => {
        formData.append(`deletedImages[${index}]`, imageUrl);
      });

      console.log("Updating blog with data:", {
        blogId,
        category: data.category,
        title: data.title,
        content: data.content,
        newImages: data.newImages,
        deletedImages: data.deletedImages,
      });

      // TODO: Make API call here
      // const response = await updateBlog(id, formData);
      // console.log('Blog updated:', response);
    } catch (error) {
      console.error("Error updating blog:", error);
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
    return (
      <div className="bg-[#fff] p-5 rounded-2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading blog data...</div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="bg-[#fff] p-5 rounded-2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Blog not found</div>
        </div>
      </div>
    );
  }

  return (
    <BlogForm
      mode="edit"
      initialData={blogData}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default EditBlog;
