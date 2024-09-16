export interface BidI {
  id: string;
  title: string;
  status: string;
  dueDate: string;
  publishDate: string;
  category: string;
  solicitationType: string;
  agency: string;
}

export interface BidsResponseI {
  data: {
    bids: BidI[];
    message: string;
  };
}

export interface BidResponseI {
  data: {
    bid: BidI;
    message: string;
  };
}
