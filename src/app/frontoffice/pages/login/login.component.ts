import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (user) => {
        if (user) {
          console.log('User logged in:', user);
          this.router.navigate(['/home']);
        } else {
          alert('Login failed!');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}
