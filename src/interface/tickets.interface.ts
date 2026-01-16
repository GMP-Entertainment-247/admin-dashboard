export interface TicketHistoryItem {
  id: number;
  uuid: string;
  created_at: string;
  event?: { title?: string };
}
