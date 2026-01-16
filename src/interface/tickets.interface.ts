export interface TicketHistoryItem {
  id: number;
  uuid: string;
  created_at: string;
  event?: { title?: string; event_start_date: string; event_end_date: string };
}
