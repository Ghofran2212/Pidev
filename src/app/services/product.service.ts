import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, Review } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        {
            id: '1',
            name: 'Ultra Lightweight Tent',
            description: 'Perfect for solo hikers, this 2lb tent is waterproof and easy to set up.',
            price: 199.99,
            imageUrl: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=500',
            category: 'Tents',
            providerId: 'gear1',
            stock: 15,
            rating: 4.5,
            reviews: [
                { id: 'r1', userId: 'u1', userName: 'Alice', rating: 5, comment: 'Great tent, very light!', date: new Date() },
                { id: 'r2', userId: 'u2', userName: 'Bob', rating: 4, comment: 'Good quality.', date: new Date() }
            ]
        },
        {
            id: '2',
            name: 'All-Terrain Hiking Boots',
            description: 'Durable boots for any trail condition. Vibram soles for maximum grip.',
            price: 129.50,
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
            category: 'Footwear',
            providerId: 'gear1',
            stock: 30,
            rating: 4.8,
            reviews: []
        },
        {
            id: '3',
            name: 'Compact Camping Stove',
            description: 'Boil water in minutes with this fuel-efficient portable stove.',
            price: 45.00,
            imageUrl: 'https://images.unsplash.com/photo-1596751303362-c3977439de4a?w=500',
            category: 'Cooking',
            providerId: 'gear2',
            stock: 25,
            rating: 4.2,
            reviews: []
        }
    ];

    getProducts(): Observable<Product[]> {
        return of(this.products);
    }

    getProductById(id: string): Observable<Product | undefined> {
        return of(this.products.find(p => p.id === id));
    }

    addReview(productId: string, review: Omit<Review, 'id' | 'date'>): Observable<Product | undefined> {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const newReview: Review = {
                ...review,
                id: Math.random().toString(36).substr(2, 9),
                date: new Date()
            };
            product.reviews.push(newReview);
            // Update average rating
            const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
            product.rating = sum / product.reviews.length;
            return of(product);
        }
        return of(undefined);
    }
}
