export interface Payment {
  id?: number;
  tenderId: number;
  bidId: number;
  bidderName: string;
  amount: number;
  paymentMethod: 'bank' | 'card' | 'mobile';
  mobilePaymentMethod?: 'bkash' | 'nogod' | 'upay' | null;
  accountNumber?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  mobileNumber?: string;
  paymentDate?: string;  
}
