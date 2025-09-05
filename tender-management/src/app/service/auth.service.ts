import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; 
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }

  login(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserId(): number | null {
    return this.currentUser?.id || null;
  }

  getCurrentUserName(): string {
    return this.currentUser?.username || '';
  }

  getCurrentUserEmail(): string {
    return this.currentUser?.email || '';
  }

  getCurrentUserRole(): string {
    return this.currentUser?.role || '';
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
