import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TenderLocation } from "../model/location.model";


@Injectable({
  providedIn: 'root'
})
export class LocationService {

   private apiUrl = 'http://localhost:8080/api/locations';  // your Spring Boot backend endpoint

  constructor(private http: HttpClient) { }

  getAll(): Observable<TenderLocation[]> {
    return this.http.get<TenderLocation[]>(this.apiUrl);
  }

  getById(id: number): Observable<TenderLocation> {
    return this.http.get<TenderLocation>(`${this.apiUrl}/${id}`);
  }

  create(location: TenderLocation): Observable<TenderLocation> {
    return this.http.post<TenderLocation>(this.apiUrl, location);
  }

  update(id: number, location: TenderLocation): Observable<TenderLocation> {
    return this.http.put<TenderLocation>(`${this.apiUrl}/${id}`, location);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
