// tender.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tender } from '../model/tender.model';
//import { Category } from '../model/category.model';
import { Source } from '../model/source.model';
import { TenderLocation } from '../model/location.model';
import { Category } from '../model/Category.model';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private baseUrl = 'http://localhost:8080/api/tenders';

  constructor(private http: HttpClient) {}

  // 🔷 Create tender with documents
  createTenderWithDocuments(tender: Tender, files: FileList | null): Observable<Tender> {
    const formData = new FormData();
    formData.append('tender', new Blob([JSON.stringify(tender)], { type: 'application/json' }));

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('documents', files[i], files[i].name);
      }
    }

    return this.http.post<Tender>(this.baseUrl, formData);
  }

  // 🔷 Get all tenders
  getAllTenders(): Observable<Tender[]> {
    return this.http.get<Tender[]>(this.baseUrl);
  }

  // 🔷 Get tender by ID
  getTenderById(id: number): Observable<Tender> {
    return this.http.get<Tender>(`${this.baseUrl}/${id}`);
  }

  // 🔷 Update tender
  updateTender(id: number, tender: Tender): Observable<Tender> {
    return this.http.put<Tender>(`${this.baseUrl}/${id}`, tender);
  }

  // 🔷 Delete tender
  deleteTender(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // 🔷 Dropdown support: Category, Location, Source
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/api/categories');
  }

  getLocations(): Observable<TenderLocation[]> {
    return this.http.get<TenderLocation[]>('http://localhost:8080/api/locations');
  }

  getSources(): Observable<Source[]> {
    return this.http.get<Source[]>('http://localhost:8080/api/sources');
  }
}
