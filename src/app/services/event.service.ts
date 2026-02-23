import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event, EventBooking } from '../models/event.model';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private events: Event[] = [
        {
            id: 'e1',
            title: 'Summer Solstice Wild Camp',
            description: 'Join us for a weekend of wild camping and stargazing in the heart of the Rockies.',
            date: new Date('2026-06-20'),
            location: 'Rocky Mountains, CO',
            price: 150,
            imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=500',
            organizerId: 'org1',
            isSponsored: true,
            category: 'Event',
            sponsorName: 'Mountain Gear Co.',
            sponsorLogoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 'e2',
            title: 'Lakeside Yoga Retreat',
            description: 'Morning yoga, afternoon paddleboarding, and campfire meditation.',
            date: new Date('2026-07-15'),
            location: 'Lake Tahoe, CA',
            price: 299,
            imageUrl: 'https://images.unsplash.com/photo-1506484334402-40ff22e05a6d?w=500',
            organizerId: 'org2',
            isSponsored: false,
            category: 'Event'
        },
        {
            id: 'e3',
            title: 'Survival Skills Workshop',
            description: 'Learn fire starting, shelter building, and foraging from the pros.',
            date: new Date('2026-08-05'),
            location: 'Olympic National Park, WA',
            price: 450,
            imageUrl: 'https://images.unsplash.com/photo-1496080174650-637e3f22fa03?w=500',
            organizerId: 'org3',
            isSponsored: true,
            category: 'Event',
            sponsorName: 'Outdoor Survivalist Inc.',
            sponsorLogoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 'e4',
            title: 'Alpine Summit Expedition',
            description: 'A challenging 3-day trek to the summit of Mount Whitney.',
            date: new Date('2026-08-20'),
            location: 'Sierra Nevada, CA',
            price: 550,
            imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500',
            organizerId: 'org4',
            isSponsored: false,
            category: 'Outdoor Trip'
        }
    ];

    private bookings: EventBooking[] = [];

    getEvents(): Observable<Event[]> {
        return of(this.events);
    }

    bookEvent(eventId: string, userId: string): Observable<EventBooking> {
        const newBooking: EventBooking = {
            id: Math.random().toString(36).substr(2, 9),
            eventId,
            userId,
            bookingDate: new Date(),
            status: 'CONFIRMED'
        };
        this.bookings.push(newBooking);
        return of(newBooking);
    }

    getUserBookings(userId: string): Observable<EventBooking[]> {
        return of(this.bookings.filter(b => b.userId === userId));
    }
}
