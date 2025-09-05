import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkOrder } from '../model/work-order.model';
//import { WorkOrder } from '../model/workorder.model';

@Injectable({ providedIn: 'root' })
export class WorkOrderService {
  private apiUrl = 'http://localhost:8080/api/workorders';

  constructor(private http: HttpClient) {}

  createWorkOrderFromBid(bidId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/createFromBid/${bidId}`, {});
  }
  getAllWorkOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(`${this.apiUrl}/all`);
  }
  getWorkOrdersByTender(tenderId: number): Observable<WorkOrder[]> {
  return this.http.get<WorkOrder[]>(`${this.apiUrl}/tender/${tenderId}/workorders`);
}

}
