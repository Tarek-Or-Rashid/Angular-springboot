import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { PaymentRequest } from './payment-request.model';

@Injectable({
  providedIn: 'root'
})
export class TenderPaymentService {

  
  private apiUrl = 'http://localhost:8080/api/admin-wallet/credit';

  constructor(private http: HttpClient) {}

  creditTenderBudget(walletData: any): Observable<any> {
    return this.http.post(this.apiUrl, walletData);
  }
}
