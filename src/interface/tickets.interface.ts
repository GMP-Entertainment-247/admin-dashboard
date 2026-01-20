import type { Event } from "./events.interface";

export interface TicketHistoryItem {
  id: number;
  uuid: string;
  created_at: string;
  event?: { title?: string; event_start_date: string; event_end_date: string };
  unique: string
}

export interface ITicket    {
  id: number,
  uuid: string,
  unique: string,
  created_at: string;
  event: Event
}