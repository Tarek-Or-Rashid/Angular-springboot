export interface PaymentRequest {
  amount: number;
  paymentMethod: string;
  description: string;
  bidderName: string;
  mobilePaymentMethod: string;
  accountNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  mobileNumber: string;
}
