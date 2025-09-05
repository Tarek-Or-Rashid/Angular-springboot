export interface BidDTO {
  id: number;
  tenderId: number;
  tenderTitle: string;
  bidderName: string;
  contactNumber: string;
  email: string;
  amount: number;
  remarks: string;
  status: string;         // e.g. 'PENDING', 'ACCEPTED', 'REJECTED'
  submissionDate: string; // ISO date string
  documents?: string[];   // Optional, adjust type if needed
}
