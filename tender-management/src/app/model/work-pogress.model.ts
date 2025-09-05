export interface WorkProgress {
  id?: number;
  tenderId: number;
  description: string;
  progressPercentage: number;
  status?: string;
  updatedDate: string; // date in 'yyyy-MM-dd' format for binding to <input type="date">
}