import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import type {
  BlogDetailsComment,
  BlogDetailsLike,
} from "../../../interface/blog.interface";

export type BlogDraftMode = "create" | "edit";

export interface BlogDraftData {
  category: string;
  title: string;
  content: string;
  existingMedia: { id: string; file: string; type: "video" | "image" }[];
  newMedia: File[];
  deletedMediaIds: string[];
  blogId?: string | number;
  comments?: BlogDetailsComment[];
  likes?: BlogDetailsLike[];
}

export interface BlogDraft {
  mode: BlogDraftMode;
  data: BlogDraftData;
}

interface BlogDraftContextValue {
  draft: BlogDraft | null;
  setDraft: Dispatch<SetStateAction<BlogDraft | null>>;
}

const BlogDraftContext = createContext<BlogDraftContextValue | undefined>(
  undefined
);

export const BlogDraftProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<BlogDraft | null>(null);

  return (
    <BlogDraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </BlogDraftContext.Provider>
  );
};

export const useBlogDraft = (): BlogDraftContextValue => {
  const ctx = useContext(BlogDraftContext);
  if (!ctx) {
    throw new Error("useBlogDraft must be used within a BlogDraftProvider");
  }
  return ctx;
};
