import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment.model';
//import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  // Create new payment
  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}`, payment);
  }

  // Get all payments
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}`);
  }

  // Get the latest payment
  getLatestPayment(): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/latest`);
  }

  // Get payments by tender ID
  getPaymentsByTenderId(tenderId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/tender/${tenderId}`);
  }

  // Get total amount for a specific tender
  getTotalAmountByTenderId(tenderId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tender/${tenderId}/total`);
  }
makePayment(payment: Payment): Observable<Payment> {
  return this.http.post<Payment>(`${this.baseUrl}`, payment);
}
  // Get total amount of all payments
  getTotalAmount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }
}
