export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    providerId: string;
    stock: number;
    rating: number;
    reviews: Review[];
}

export interface Order {
    id: string;
    userId: string;
    items: { productId: string; quantity: number; price: number }[];
    totalPrice: number;
    orderDate: Date;
    status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    deliveryAddress: string;
}
