import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DeliveryItem {
    name: string;
    quantity: number;
    weight: number; // in kg
}

export interface Delivery {
    id: string;
    orderId: string;
    customerName: string;
    address: string;
    status: 'AVAILABLE' | 'PICKED_UP' | 'DELIVERED' | 'DECLINED';
    personnelId?: string;
    date: Date;
    price: number;
    items: DeliveryItem[];
    weight: number;
    instructions?: string;
}

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    private deliveries: Delivery[] = [
        {
            id: 'd1', orderId: 'ord123', customerName: 'John Doe', address: '123 Forest Rd, Pine City',
            status: 'AVAILABLE', date: new Date(Date.now() - 86400000), price: 15.5,
            items: [{ name: 'Camping Tent', quantity: 1, weight: 3.5 }], weight: 3.5,
            instructions: 'Leave at the front porch if no answer.'
        },
        {
            id: 'd2', orderId: 'ord456', customerName: 'Jane Smith', address: '789 Mountain View, Peaks',
            status: 'AVAILABLE', date: new Date(), price: 20.0,
            items: [{ name: 'Sleeping Bag', quantity: 2, weight: 2.0 }, { name: 'Portable Stove', quantity: 1, weight: 1.5 }],
            weight: 3.5, instructions: 'Ring bell twice.'
        },
        {
            id: 'd3', orderId: 'ord789', customerName: 'Bob Wilson', address: '456 River Lane, Valley',
            status: 'PICKED_UP', personnelId: 'delivery1', date: new Date(Date.now() - 172800000), price: 12.0,
            items: [{ name: 'Hiking Boots', quantity: 1, weight: 1.2 }], weight: 1.2
        },
        {
            id: 'd4', orderId: 'ord101', customerName: 'Alice Green', address: '101 Pine St, Evergreen',
            status: 'AVAILABLE', date: new Date(Date.now() - 43200000), price: 18.0,
            items: [{ name: 'Backpack 60L', quantity: 1, weight: 2.5 }], weight: 2.5,
            instructions: 'Call on arrival.'
        },
        {
            id: 'd5', orderId: 'ord102', customerName: 'Charlie Brown', address: '202 Oak Ave, Woodstown',
            status: 'AVAILABLE', date: new Date(Date.now() - 3600000), price: 25.0,
            items: [{ name: 'First Aid Kit', quantity: 3, weight: 0.9 }], weight: 0.9
        },
        {
            id: 'd6', orderId: 'ord103', customerName: 'Diana Prince', address: '303 Amazon Way, Themyscira',
            status: 'AVAILABLE', date: new Date(Date.now() + 86400000), price: 30.0,
            items: [{ name: 'Water Filter', quantity: 1, weight: 0.5 }, { name: 'Solar Charger', quantity: 1, weight: 0.8 }],
            weight: 1.3
        },
        {
            id: 'd7', orderId: 'ord104', customerName: 'Edward Norton', address: '404 Fight Club Blvd',
            status: 'AVAILABLE', date: new Date(), price: 14.5,
            items: [{ name: 'Climbing Rope 50m', quantity: 1, weight: 4.0 }], weight: 4.0
        },
        {
            id: 'd8', orderId: 'ord105', customerName: 'Frank Castle', address: '505 Justice St, NY',
            status: 'AVAILABLE', date: new Date(Date.now() - 3600000 * 5), price: 22.5,
            items: [{ name: 'Camping Lamp', quantity: 2, weight: 1.2 }], weight: 1.2
        }
    ];

    getAvailableDeliveries(): Observable<Delivery[]> {
        return of(this.deliveries.filter(d => d.status === 'AVAILABLE'));
    }

    getMyDeliveries(personnelId: string): Observable<Delivery[]> {
        return of(this.deliveries.filter(d => d.personnelId === personnelId && d.status !== 'AVAILABLE'));
    }

    takeDelivery(deliveryId: string, personnelId: string): Observable<boolean> {
        const d = this.deliveries.find(d => d.id === deliveryId);
        if (d && d.status === 'AVAILABLE') {
            d.status = 'PICKED_UP';
            d.personnelId = personnelId;
            return of(true);
        }
        return of(false);
    }

    declineDelivery(deliveryId: string): Observable<boolean> {
        const d = this.deliveries.find(d => d.id === deliveryId);
        if (d) {
            d.status = 'DECLINED';
            return of(true);
        }
        return of(false);
    }

    updateStatus(deliveryId: string, status: 'PICKED_UP' | 'DELIVERED'): Observable<boolean> {
        const d = this.deliveries.find(d => d.id === deliveryId);
        if (d) {
            d.status = status;
            return of(true);
        }
        return of(false);
    }
}
