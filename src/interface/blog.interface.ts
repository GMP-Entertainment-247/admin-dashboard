import type { ApiResponse } from "../utils/api";

export interface BlogPicture {
  id: number;
  blog_id: string;
  file: string;
  created_at: string;
  updated_at: string;
  type: "video" | "image" | null;
}

export interface Blog {
  id: number;
  category: string;
  title: string;
  content: string;
  created_at: string;
  pictures: BlogPicture[];
}

export interface BlogPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface BlogListData {
  current_page: number;
  data: Blog[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: BlogPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface BlogListResponse {
  status: boolean;
  message: string;
  data: BlogListData;
}

// Blog details (single fetch) interfaces
// export interface BlogDetailsPicture {
//   id: number;
//   blog_id: string;
//   file: string;
//   created_at?: string;
//   updated_at?: string;
// }

export interface BlogDetailsComment {
  id: number;
  blog_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  comment_id: null;
  user: {
    id: number;
    name: string;
    profile_pic: string;
    profile_picture_url: string;
  };
}
export interface BlogDetailsLike {
  id: number;
  blog_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  comment_id: null;
  user: {
    id: number;
    name: string;
    profile_pic: string;
    profile_picture_url: string;
  };
}

export interface BlogDetailsData {
  id: number;
  category: string;
  title: string;
  content: string;
  pictures: BlogPicture[];
  comments: BlogDetailsComment[];
  likes: BlogDetailsLike[];
}

export interface BlogDetailsResponse
  extends ApiResponse<BlogDetailsData | null> {}
