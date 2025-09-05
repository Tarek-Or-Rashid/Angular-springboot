import { Tender } from "./tender.model";

export interface TenderDocument {
  id?: number;
  fileName: string;
  fileType: string;
  data?: any; // Usually we don't keep file data in frontend
  tender?: Tender;
}