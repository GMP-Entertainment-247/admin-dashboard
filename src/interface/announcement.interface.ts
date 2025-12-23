import type { ApiResponse } from "../utils/api";

export interface AnnouncementCreator {
  id: number;
  name: string;
  profile_pic: string | null;
  profile_picture_url: string;
}

/**
 * Core Announcement shape as returned by the API
 */
export interface Announcement {
  id: number;
  title: string;
  description: string;
  link: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  image: string;
  status: string; // "1" | "0"
  created_by: string;
  creator: AnnouncementCreator;
}

export interface AnnouncementPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface AnnouncementListData {
  current_page: number;
  data: Announcement[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: AnnouncementPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface AnnouncementListResponse
  extends ApiResponse<AnnouncementListData> {}

export interface AnnouncementDetailsResponse
  extends ApiResponse<Announcement | null> {}
