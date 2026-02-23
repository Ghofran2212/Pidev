export interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    price: number;
    imageUrl: string;
    organizerId: string;
    isSponsored: boolean;
    category: 'Event' | 'Outdoor Trip';
    sponsorName?: string;
    sponsorLogoUrl?: string;
}

export interface EventBooking {
    id: string;
    eventId: string;
    userId: string;
    bookingDate: Date;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}
