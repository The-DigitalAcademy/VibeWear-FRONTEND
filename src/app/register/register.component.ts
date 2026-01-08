import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { registerAction } from 'src/app/store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store, private router: Router) {}
  

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    this.isLoading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    const { username, email, password } = this.registerForm.value;
    this.store.dispatch(registerAction({ user: { username, email, password } }));
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
