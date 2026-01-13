import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { id: 1, username: 'testuser', email: 'test@test.com', password: '12345' },
  ];

  private nextId = 2;

  constructor(private http: HttpClient){}

  // Register
  registerUser(user: Omit<User, 'id'>): Observable<any> {
    const exists = this.users.find((u) => u.email === user.email);
    if (exists) return throwError(() => new Error('Email already in use'));
    return this.http.post("http://localhost:9090/auth/register",user);
  }


//login
 loginUser(email: string, password: string): Observable<any> {
  return this.http.post('http://localhost:9090/auth/login', { email, password }).pipe(
    catchError((err) => {
      let message = "User not found";
      if (err.status === 401 && err.error?.error) {
        message = err.error.error;
      }
      return throwError(() => new Error(message));
    })
  );
}


  // Logout (for local storage persistence later)
  logout(): void {}
}
