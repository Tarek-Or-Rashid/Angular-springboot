// src/app/services/admin-wallet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminWallet } from '../model/adminwallet.model';
//import { AdminWallet } from '../models/admin-wallet';

@Injectable({
  providedIn: 'root',
})
export class AdminWalletService {
  private baseUrl = 'http://localhost:8080/api/admin-wallet';

  constructor(private http: HttpClient) {}

  // Get current admin wallet info
  getAdminWallet(): Observable<AdminWallet> {
    // Adjust endpoint if needed, based on your backend
    return this.http.get<AdminWallet>(`${this.baseUrl}/total-balance`);
    // Or if your backend has an endpoint that returns full wallet info, use that
  }

  // Add amount to admin wallet balance
  // addToWallet(amount: number): Observable<AdminWallet> {
  //   // The backend expects an AdminWallet object in request body with the 'amount' property
  //   const walletPayload = { amount: amount };
  //   return this.http.post<AdminWallet>(`${this.baseUrl}/credit`, walletPayload);

  getTotalBalance(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/total-balance`);
}

addToWallet(amount: number): Observable<AdminWallet> {
  const walletPayload = { amount: amount };
  return this.http.post<AdminWallet>(`${this.baseUrl}/credit`, walletPayload);
}
}
