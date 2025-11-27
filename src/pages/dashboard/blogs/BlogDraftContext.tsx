import React, { createContext, useContext, useState, ReactNode } from "react";

export type BlogDraftMode = "create" | "edit";

export interface BlogDraft {
  mode: BlogDraftMode;
  formData: FormData;
}

interface BlogDraftContextValue {
  draft: BlogDraft | null;
  setDraft: (draft: BlogDraft | null) => void;
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
