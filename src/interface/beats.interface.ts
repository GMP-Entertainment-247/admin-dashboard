export interface IBeat {
  name: string;
  description: string;
  created_at: string;
  beat_file: string;
  image_url: string;
  views_count: string;
  likes_count: string;
  direct_count: string;
  genre: string;
  user: {
    name: string;
    profile_picture_url: string;
  };
}