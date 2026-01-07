import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, throwError, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Register user
  registerUser(user: Omit<User, 'id'>): Observable<User> {
    return this.getUsers().pipe(
      map(users => users.find(u => u.email === user.email)),
      switchMap(existing => {
        if (existing) {
          return throwError(() => new Error('Email already in use'));
        }
        return this.http.post<User>(this.url, user);
      })
    );
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Login user
  loginUser(credentials: { email: string; password: string }): Observable<User> {
    return this.getUsers().pipe(
      map(users =>
        users.find(
          u => u.email === credentials.email && u.password === credentials.password
        )
      ),
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('Invalid email or password'));
        }
        localStorage.setItem('user', JSON.stringify(user));
        return this.http.get<User>(`${this.url}/${user.id}`);
      })
    );
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Get current user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) as User : null;
  }
}