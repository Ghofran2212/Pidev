import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRole } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Check localStorage for saved user on init
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    login(email: string, password: string): Observable<User | null> {
        // Mock login logic - in a real app, this would be an API call
        // For now, let's assume any login is successful and defaults to CAMPER role
        // unless the email contains a specific keyword for testing roles
        let role: UserRole = UserRole.CAMPER;

        if (email.includes('admin')) role = UserRole.ADMIN;
        else if (email.includes('gear')) role = UserRole.GEAR_PROVIDER;
        else if (email.includes('campsite')) role = UserRole.CAMPSITE_OWNER;
        else if (email.includes('wild')) role = UserRole.WILD_CAMPSITE_ADMIN;
        else if (email.includes('sponsor')) role = UserRole.SPONSOR;
        else if (email.includes('delivery')) role = UserRole.DELIVERY_PERSONNEL;
        else if (email.includes('mod')) role = UserRole.FORUM_MODERATOR;
        else if (email.includes('guide')) role = UserRole.GUIDE;
        else if (email.includes('organizer')) role = UserRole.EVENT_ORGANIZER;

        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            firstName: 'Test',
            lastName: 'User',
            email: email,
            role: role
        };

        this.setCurrentUser(mockUser);
        return of(mockUser);
    }

    register(userData: any): Observable<User> {
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role || UserRole.CAMPER,
            phoneNumber: userData.phoneNumber
        };

        this.setCurrentUser(newUser);
        return of(newUser);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private setCurrentUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    hasRole(role: UserRole): boolean {
        return this.currentUserSubject.value?.role === role;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}
