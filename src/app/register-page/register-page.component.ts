import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router 
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
    this.successMessage = '';

   
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });

    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['passwordMismatch']) {
        this.errorMessage = 'Passwords do not match!';
      } else {
        this.errorMessage = 'Please fill in all required fields correctly.';
      }
      return;
    }

    console.log('Form Data:', this.registerForm.value);
    this.successMessage = 'Registration successful!';
    
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