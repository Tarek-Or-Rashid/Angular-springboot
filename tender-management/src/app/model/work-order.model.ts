export interface WorkOrder {
  id: number;
  bidId: number;
  tenderId: number;
  bidderName: string;
  contactNumber: string;
  email: string;
  workOrderDate: Date;
}