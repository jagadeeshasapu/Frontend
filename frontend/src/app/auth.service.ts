import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private sessionTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
  }
  
  
 
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  
  isLoggedIn(): boolean {
    if (!!localStorage.getItem('token')) {
      if (this.isTokenNotExpired()) {
        return true;
      } else {
        this.logout();
        return false;
      }
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  private isTokenNotExpired(): boolean {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      return currentTime < parseInt(expirationTime, 10);
    }
    return false;
  }

  private setTokenExpiration(expirationTime: number): void {
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserEmail(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  logout(): void {
    // Clear token and expiration time on logout
    localStorage.removeItem('token');
     localStorage.removeItem('user');
    this.router.navigate(['']);

  }
}
