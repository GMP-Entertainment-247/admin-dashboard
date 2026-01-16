export interface IAudition {
  id: string;
  name: string;
  email: string;
  phone: string;
  link: string;
  user_id: string | null
  created_at: string;
}

export interface IAuditionStage {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface IAuditionMetrics {
  event: number;
  contestants: number;
  entries: number;
  livestreams: number;
  votes: string;
  tickets: number;
}
