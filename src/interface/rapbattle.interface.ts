export interface IAudition {
  id: number;
  name: string;
  email: string;
  phone: string;
  link: string;
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
