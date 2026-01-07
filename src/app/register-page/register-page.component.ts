import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthServiceService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: RegisterPageComponent.passwordMatchValidator 
    });
  }

  // Static custom validator
  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Helper method to check if passwords match (for template)
  get passwordsMatch(): boolean {
    return !this.registerForm.hasError('passwordMismatch');
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    // Mark all fields as touched to show validation errors
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      this.errorMessage = 'Please fix the errors in the form.';
      return;
    }

    const { name, surname, email, password } = this.registerForm.value;

    this.authService.register({ name, surname, email, password }).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.registerForm.reset(); // Clear form after success
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }

  // Helper methods for template validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (field?.hasError('minlength')) {
      return `Minimum ${field.errors?.['minlength'].requiredLength} characters required`;
    }
    return '';
  }
}