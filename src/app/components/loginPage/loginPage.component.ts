import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginPage',  
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    console.log('Login data:', loginData);

 

    // Navigation after login
    this.router.navigate(['/home']);
  }
}
