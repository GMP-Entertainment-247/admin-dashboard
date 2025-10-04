import BlogForm from "../../../components/BlogForm";
import { useState } from "react";

export default function CreateBlog() {
  const [isLoading, setIsLoading] = useState(false);

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

      console.log("Creating blog with data:", {
        category: data.category,
        title: data.title,
        content: data.content,
        newImages: data.newImages,
        deletedImages: data.deletedImages,
      });

      // TODO: Make API call here
      // const response = await createBlog(formData);
      // console.log('Blog created:', response);
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlogForm mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
  );
}
