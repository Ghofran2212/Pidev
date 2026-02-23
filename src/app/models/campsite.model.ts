export interface Campsite {
    id: string;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    imageUrl: string;
    hasOwner: boolean;
    ownerId?: string;
    rating: number;
    amenities: string[];
    maxCapacity: number;
}
