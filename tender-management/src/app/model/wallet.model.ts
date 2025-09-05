export interface Wallet {
  id?: number;
  userId: number;
  balance: number;
  method: 'CARD' | 'BANK' | 'MOBILE';
  number: string;
  provider?: 'BKASH' | 'NAGAD' | 'UPAY'; // for mobile
  cardNumber?: string;
  accountNumber?: string;
  createdAt?: Date;
}
