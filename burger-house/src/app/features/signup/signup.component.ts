import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  submitted = false;
  showPassword = false;
  passwordStrength = 0;
  passwordStrengthText = '';
  
  // SVG icons for password visibility toggle
  eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>`;
  
  eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>`;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    // Password strength checker
    this.signupForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
    });
  }

  // Getter for easy access to form fields
  get f() { 
    return this.signupForm.controls; 
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkPasswordStrength(password: string): void {
    this.passwordStrength = 0;
    
    if (!password) {
      this.passwordStrengthText = '';
      return;
    }
    
    // Check length
    if (password.length >= 8) {
      this.passwordStrength += 1;
    }
    
    // Check for lowercase and uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      this.passwordStrength += 1;
    }
    
    // Check for numbers
    if (/[0-9]/.test(password)) {
      this.passwordStrength += 1;
    }
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      this.passwordStrength += 1;
    }
    
    // Set text based on strength
    switch (this.passwordStrength) {
      case 0:
      case 1:
        this.passwordStrengthText = 'Weak';
        break;
      case 2:
        this.passwordStrengthText = 'Fair';
        break;
      case 3:
        this.passwordStrengthText = 'Good';
        break;
      case 4:
        this.passwordStrengthText = 'Strong';
        break;
      default:
        this.passwordStrengthText = '';
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      // In a real application, you would call a registration service
      console.log('Signup form submitted:', this.signupForm.value);
      
      // Store user details in localStorage or a service
      localStorage.setItem('currentUser', JSON.stringify({
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        token: 'fake-jwt-token'
      }));
      
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 1500);
  }
}