import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
  submitted = false;
  isLogin = true;

  errorMessage: string = '';
  registrationError: string = '';
  registrationSuccess: string = '';

  roles: string[] = ['admin', 'user', 'employee', 'audit'];

  userPayload = {
    username: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the login form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Handle login form submission
  onLoginSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) return;

    const loginPayload = this.loginForm.value;

    this.http.post<any>('http://localhost:8080/api/users/login', loginPayload).subscribe({
      next: (response) => {
        // Save user info to localStorage
        localStorage.setItem('id', response.id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome, ${response.username}!`,
          timer: 2000,
          showConfirmButton: false
        });

        // Navigate to role-specific dashboard after alert timeout
        setTimeout(() => {
          switch (response.role) {
            case 'admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'user':
              this.router.navigate(['/user-dashboard']);
              break;
            case 'employee':
              this.router.navigate(['/employee/dashboard']);
              break;
            case 'audit':
              this.router.navigate(['/audit/dashboard']);
              break;
            default:
              this.router.navigate(['/']);
          }
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password.';
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: this.errorMessage
        });
      }
    });
  }

  // Handle registration form submission
  onRegisterSubmit(): void {
    // Validate required fields
    if (!this.userPayload.username || !this.userPayload.email || !this.userPayload.password || !this.userPayload.role) {
      this.registrationError = 'All fields are required.';
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: this.registrationError
      });
      return;
    }

    this.http.post<any>('http://localhost:8080/api/users/register', this.userPayload).subscribe({
      next: () => {
        this.registrationSuccess = 'Registration successful. You can now log in.';
        this.registrationError = '';
        this.userPayload = { username: '', email: '', password: '', role: '' };
        this.isLogin = true;

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: this.registrationSuccess,
          timer: 2500,
          showConfirmButton: false
        });
      },
      error: () => {
        this.registrationError = 'Registration failed. Try a different email.';
        this.registrationSuccess = '';
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: this.registrationError
        });
      }
    });
  }

  // Get current user info from localStorage
  getCurrentUser(): any {
    return {
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role')
    };
  }

  // Get current user role from localStorage
  getCurrentUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Logout user, clear storage and navigate to login page
  logout(): void {
    localStorage.clear();
    Swal.fire({
      icon: 'info',
      title: 'Logged out',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }
}