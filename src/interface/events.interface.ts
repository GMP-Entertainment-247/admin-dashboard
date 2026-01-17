export interface EventCreator {
  id: number;
  name: string;
  profile_pic: string | null;
  profile_picture_url: string;
}

/**
 * Core Event shape as returned by the API
 */
export interface Event {
  id: number;
  title: string;
  venue: string;
  location: string;
  image_url: string;
  description: string;
  entry_mode: string;
  created_by: string;
  price: string;
  event_start_date: string;
  event_end_date: string;
  sale_start_date: string | null;
  sale_end_date: string | null;
  available_tickets: string;
  created_at: string;
  updated_at: string;
  ticket_left: string;
  rap_battle_id: string | null;
  stage: string | null;
  link: string | null;
  creator?: EventCreator;
}
