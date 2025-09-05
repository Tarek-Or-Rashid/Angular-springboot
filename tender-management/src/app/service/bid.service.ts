import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bid } from '../model/bid.model';
import { BidDTO } from '../model/biddto.model';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private apiUrl = 'http://localhost:8080/api/bids';

  constructor(private http: HttpClient) {}

  submitBid(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, { responseType: 'text' });
  }

  getAllBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(this.apiUrl);
  }

  // getBidsByTenderId(tenderId: number): Observable<Bid[]> {
  //   return this.http.get<Bid[]>(`${this.apiUrl}/tender/${tenderId}`);
  // }
acceptBid(bidId: number): Observable<string> {
  return this.http.post(`http://localhost:8080/api/bids/accept/${bidId}`, {}, { responseType: 'text' });
}

// acceptBid(bidId: number): Observable<string> {
//   return this.http.post(`http://localhost:8080/api/bids/accept/${bidId}`, {}, { responseType: 'text' });
// }

  rejectBid(bidId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/reject/${bidId}`, {});
  }

  getAcceptedBids(tenderId: number): Observable<BidDTO[]> {
    return this.http.get<BidDTO[]>(`${this.apiUrl}/tender/${tenderId}/accepted`);
  }

  getRejectedBids(tenderId: number): Observable<BidDTO[]> {
    return this.http.get<BidDTO[]>(`${this.apiUrl}/tender/${tenderId}/rejected`);
  }
  getBidsByTenderId(tenderId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/bids/tender/${tenderId}`);
}

// updateBidStatus(bidId: number, status: 'ACCEPTED' | 'REJECTED'): Observable<any> {
//   return this.http.put(`http://localhost:8080/api/bids/${bidId}/status`, { status });
// }
  updateBidStatus(bidId: number, status: string): Observable<any> {
  const url = `${this.apiUrl}/${bidId}/status`;
  return this.http.put(url, { status }, { responseType: 'text' });
}

}
