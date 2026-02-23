import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserRole } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: UserRole.CAMPER
  };

  roles = [
    { value: UserRole.CAMPER, label: 'Camper' },
    { value: UserRole.GEAR_PROVIDER, label: 'Gear Provider' },
    { value: UserRole.CAMPSITE_OWNER, label: 'Campsite Owner' },
    { value: UserRole.WILD_CAMPSITE_ADMIN, label: 'Wild Campsite Admin' },
    { value: UserRole.SPONSOR, label: 'Sponsor' },
    { value: UserRole.DELIVERY_PERSONNEL, label: 'Delivery Personnel' },
    { value: UserRole.FORUM_MODERATOR, label: 'Forum Moderator' },
    { value: UserRole.GUIDE, label: 'Guide' },
    { value: UserRole.EVENT_ORGANIZER, label: 'Event Organizer' }
  ];

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.userData.password !== this.userData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.register(this.userData).subscribe({
      next: (user) => {
        console.log('User registered:', user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }
}
