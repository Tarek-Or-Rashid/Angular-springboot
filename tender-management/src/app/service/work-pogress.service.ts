import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkProgress } from '../model/work-pogress.model';
//import { WorkProgress } from '../model/work-progress.model';
//'import { WorkProgress } from '../models/work-progress.model';

@Injectable({
  providedIn: 'root'
})
export class WorkProgressService {

  private baseUrl = 'http://localhost:8080/api/workprogress';

  constructor(private http: HttpClient) {}

  getAllWorkProgress(): Observable<WorkProgress[]> {
    return this.http.get<WorkProgress[]>(this.baseUrl);
  }

  createWorkProgress(workProgress: WorkProgress): Observable<WorkProgress> {
    return this.http.post<WorkProgress>(this.baseUrl, workProgress);
  }

  updateWorkProgress(id: number, workProgress: WorkProgress): Observable<WorkProgress> {
    return this.http.put<WorkProgress>(`${this.baseUrl}/${id}`, workProgress);
  }

  deleteWorkProgress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
