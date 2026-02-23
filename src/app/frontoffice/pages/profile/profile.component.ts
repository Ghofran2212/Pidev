import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: User | null = null;
    editMode = false;
    editedUser: Partial<User> = {};
    successMessage = '';

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.user = user;
            if (user) {
                this.editedUser = { ...user };
            }
        });
    }

    toggleEdit(): void {
        this.editMode = !this.editMode;
        if (!this.editMode && this.user) {
            this.editedUser = { ...this.user };
        }
    }

    saveProfile(): void {
        if (this.user && this.editedUser) {
            // In a real app, this would call a userService.updateProfile()
            // For now, we update the mock user in AuthService
            const updatedUser = { ...this.user, ...this.editedUser } as User;

            // Update localStorage and AuthSubject
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            // Re-trigger auth service update (hacking it a bit since it's mock)
            (this.authService as any).currentUserSubject.next(updatedUser);

            this.editMode = false;
            this.successMessage = 'Profile updated successfully!';
            setTimeout(() => this.successMessage = '', 3000);
        }
    }
}
