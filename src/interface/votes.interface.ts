export interface VoteHistoryItem {
  id: number;
  vote: string;
  amount: string;
  created_at: string;
  event?: { title?: string };
  contestant: {
    id: string;
    name: string;
  };
}

export interface IVote {
  id: string;
  amount: string;
  // uuid: ;
  vote: string;
  rap_battle_id: string;
  audition_id: string;
  voter_id: string;
  created_at: string;
  updated_at: string;
  stage: null;
  event: {
    id: string;
    title: string;
    scheduled_date: string;
    link: string;
    image: string;
    description: string;
    // created_by: "43";
    // created_at: "2025-11-14T11:27:57.000000Z";
    // updated_at: "2026-01-15T10:05:01.000000Z";
    price_per_vote: string;
    // status: "1";
    // stage: "2";
    // start_date: null;
    // end_date: null;
  };
  voter: {
    id: string;
    name: string;
    profile_pic: string;
    profile_picture_url: string;
  };
  contestant: {
    id: string;
    name: string;
  };
}
