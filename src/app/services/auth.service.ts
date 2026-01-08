import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { id: 1, username: 'testuser', email: 'test@test.com', password: '12345' },
  ];

  private nextId = 2;

  // Register
  registerUser(user: Omit<User, 'id'>): Observable<User> {
    const exists = this.users.find((u) => u.email === user.email);
    if (exists) return throwError(() => new Error('Email already in use'));

    const newUser: User = { ...user, id: this.nextId++ };
    this.users.push(newUser);
    return of(newUser);
  }

  // Login
  loginUser(email: string, password: string): Observable<User> {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (!user) return throwError(() => new Error('Invalid email or password'));
    return of(user);
  }

  // Logout (for local storage persistence later)
  logout(): void {}
}
