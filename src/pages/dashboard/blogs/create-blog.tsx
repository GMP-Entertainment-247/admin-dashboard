import BlogForm from "../../../components/BlogForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlog } from "./data";
import { BlogCreateResponse } from "../../../interface/blog.interface";
import { flattenErrorMessage } from "../../../utils/errorHelpers";

export default function CreateBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    // console.log(formData);

    try {
      const response: BlogCreateResponse = await createBlog(formData);

      if (response.status) {
        // Success
        toast.success(
          (response.message as string) || "Blog created successfully!"
        );
        navigate("/blogs");
      } else {
        // Error - handle message structure
        const errorMessage = flattenErrorMessage(response.message);
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error creating blog:", error);

      // Handle network or other errors
      const errorMessage = error.response?.data?.message
        ? flattenErrorMessage(
            error.response.data.message,
            "An error occurred while creating the blog"
          )
        : "An error occurred while creating the blog";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlogForm mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
  );
}
