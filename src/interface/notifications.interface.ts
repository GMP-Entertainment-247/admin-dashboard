export interface NotificationUser {
  id: number;
  user_type: string;
  profile_picture_url: string;
}

export interface NotificationItem {
  title: string | null;
  admin_narration: string;
  user_id: string;
  user: NotificationUser;
  created_at?: string;
}

export interface NotificationData {
  current_page: number;
  data: NotificationItem[];
  last_page: number;
  total: number;
}
