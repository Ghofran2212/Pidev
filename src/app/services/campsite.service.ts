import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Campsite } from '../models/campsite.model';

@Injectable({
    providedIn: 'root'
})
export class CampsiteService {
    private campsites: Campsite[] = [
        {
            id: 'cs1',
            name: 'Pine Ridge Sanctuary',
            description: 'A beautiful owned campsite with full amenities and stunning mountain views.',
            location: 'Blue Ridge Mountains, NC',
            pricePerNight: 45,
            imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500',
            hasOwner: true,
            ownerId: 'owner1',
            rating: 4.8,
            amenities: ['Power', 'Water', 'Showers', 'WiFi'],
            maxCapacity: 50
        },
        {
            id: 'cs2',
            name: 'River Bend Wild Spot',
            description: 'A secluded ownerless site perfect for bushcraft and true wilderness experience.',
            location: 'Ozark National Forest, AR',
            pricePerNight: 0,
            imageUrl: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=500',
            hasOwner: false,
            rating: 4.2,
            amenities: ['Fire Pit', 'River Access'],
            maxCapacity: 10
        },
        {
            id: 'cs3',
            name: 'Golden Valley Meadows',
            description: 'Expansive meadows with basic facilities. Family friendly.',
            location: 'Napa Valley, CA',
            pricePerNight: 30,
            imageUrl: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=500',
            hasOwner: true,
            ownerId: 'owner2',
            rating: 4.5,
            amenities: ['Power', 'Toilets', 'Playground'],
            maxCapacity: 100
        },
        {
            id: 'cs4',
            name: 'Silent Woods Clearing',
            description: 'An ownerless clearing deep in the woods. Bring everything you need.',
            location: 'White Mountains, NH',
            pricePerNight: 0,
            imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500',
            hasOwner: false,
            rating: 4.9,
            amenities: ['Breathtaking Views'],
            maxCapacity: 5
        }
    ];

    getCampsites(): Observable<Campsite[]> {
        return of(this.campsites);
    }

    getCampsiteById(id: string): Observable<Campsite | undefined> {
        return of(this.campsites.find(c => c.id === id));
    }
}
