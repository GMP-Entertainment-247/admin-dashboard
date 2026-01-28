import { useEffect } from "react";
import BlogForm from "../../../components/BlogForm";
import { useBlogDraft } from "./BlogDraftContext";

export default function CreateBlog() {
  const { draft, setDraft } = useBlogDraft();

  useEffect(() => {
    if (draft?.mode === "create" && draft.data) return;
    setDraft({
      mode: "create",
      data: {
        category: "",
        title: "",
        content: "",
        existingMedia: [],
        newMedia: [],
        deletedMediaIds: [],
        blogId: undefined,
        comments: [],
        likes: [],
      },
    });
  }, [draft, setDraft]);

  return <BlogForm />;
}
