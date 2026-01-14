import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:9090/auth';

  constructor(private http: HttpClient) {}

  registerUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  loginUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, 
      { email, password },
    { withCredentials: true }
  );
  }

  logout(): void {}
}
