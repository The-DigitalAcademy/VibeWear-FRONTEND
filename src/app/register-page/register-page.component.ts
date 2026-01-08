import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService, RegisterRequest } from '../services/auth-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  isLoading: boolean = false;
successMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    // Mark all fields as touched
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });

    // Check if form is invalid
    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['passwordMismatch']) {
        this.errorMessage = 'Passwords do not match!';
      } else {
        this.errorMessage = 'Please fill in all required fields correctly.';
      }
      return;
    }

    // Prepare registration data
    const registerData: RegisterRequest = {
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.isLoading = true;

    // Call registration service
    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Registration successful:', response);
        
        // Clear token if you want user to login manually
        this.authService.clearToken();
        
        // Immediately route to login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.errors?.[errorType] && (field.touched || this.submitted));
  }

  get passwordMismatch(): boolean {
    return !!(
      this.registerForm.errors?.['passwordMismatch'] && 
      (this.registerForm.get('confirmPassword')?.touched || this.submitted)
    );
  }
}