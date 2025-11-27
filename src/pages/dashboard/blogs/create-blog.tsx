import BlogForm from "../../../components/BlogForm";
import { useNavigate } from "react-router-dom";
import { useBlogDraft } from "./BlogDraftContext";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { setDraft } = useBlogDraft();

  const handlePreview = (formData: FormData) => {
    setDraft({
      mode: "create",
      formData,
    });
    navigate("/blogs/preview");
  };

  return (
    <BlogForm
      mode="create"
      onSubmit={handlePreview}
      primaryButtonLabel="Preview"
    />
  );
}
