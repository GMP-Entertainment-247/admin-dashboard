export interface VoteHistoryItem {
  id: number;
  vote: string;
  amount: string;
  created_at: string;
  event?: { title?: string };
}
