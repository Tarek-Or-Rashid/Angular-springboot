import { Tender } from "./tender.model";

export interface Bid {
  id?: number;
  tenderId: number;
  bidderName: string;
  contactNumber?: string;
  email?: string;
  amount: number;
  remarks?: string;
  status?: string;
  submissionDate?: Date;
  documents?: string[];
}