export interface IFan {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_picture_url: string;
  created_at?: string;
  location: string | null;
  suspend: "1" | "0" | 1 | 0;
}


