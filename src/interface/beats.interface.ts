export interface IBeat {
  id: string;
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

export interface BeatMetrics {
  uploads: number;
  streams: number;
  downloads: number;
  saves: number;
}

export interface IBeatDetails {
  id: number;
  name: string;
  created_by: string;
  description: string;
  image_url: string;
  beat_file: string;
  created_at: string;
  updated_at: string;
  battle: {
    id: number;
    title: string;
  };
  gen: {
    id: number;
    name: string;
  };
}
