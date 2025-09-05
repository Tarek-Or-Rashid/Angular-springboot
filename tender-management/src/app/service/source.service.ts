import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Source } from '../model/source.model';
//import { Source } from './source.model';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  private apiUrl = 'http://localhost:8080/api/sources';

  constructor(private http: HttpClient) {}

  getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(this.apiUrl);
  }

  getSource(id: number): Observable<Source> {
    return this.http.get<Source>(`${this.apiUrl}/${id}`);
  }

  createSource(source: Source): Observable<Source> {
    return this.http.post<Source>(this.apiUrl, source);
  }

  updateSource(id: number, source: Source): Observable<Source> {
    return this.http.put<Source>(`${this.apiUrl}/${id}`, source);
  }

  deleteSource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
