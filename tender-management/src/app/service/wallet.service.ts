import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wallet } from '../model/wallet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private baseUrl = 'http://localhost:8080/api/wallet';

  constructor(private http: HttpClient) {}

  getUserWallet(username: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.baseUrl}/${username}`);
  }

  addBalance(username: string, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${username}`, {
      amount: amount,
      description: 'Add balance'
    });
  }

  withdrawBalance(username: string, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/withdraw/${username}`, {
      amount: amount,
      description: 'Withdraw balance'
    });
  }
}
