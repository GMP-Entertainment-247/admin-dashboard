export interface BlogPicture {
  id: number;
  blog_id: string;
  file: string;
  created_at: string;
  updated_at: string;
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
export interface BlogDetailsPicture {
  id: number;
  blog_id: string;
  file: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogDetailsData {
  id: number;
  category: string;
  title: string;
  content: string;
  pictures: BlogDetailsPicture[];
  created_at?: string;
}

// Generic API response and specific responses
export interface ApiResponse<T = any> {
  status: boolean;
  message: string | Record<string, string | string[]>;
  data: T;
}

export interface BlogCreateResponse extends ApiResponse<null> {}

export interface BlogDetailsResponse
  extends ApiResponse<BlogDetailsData | null> {}
