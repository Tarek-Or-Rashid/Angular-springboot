import { Category } from "./Category.model";
import { TenderLocation } from "./location.model";
import { Source } from "./source.model";
import { TenderDocument } from "./TenderDocument.model";
import { User } from "./user.model";

export interface Tender {
  id?: number;
  title: string;
  totalAmount: number;
  description?: string;
  deadline: string;  
  budget?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  location?: TenderLocation;
  source?: Source;
  createdBy?: User;
  documents?: TenderDocument[];
}
