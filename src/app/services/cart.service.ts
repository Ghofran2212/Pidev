import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem extends Product {
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsSubject = new BehaviorSubject<CartItem[]>([]);
    public items$ = this.itemsSubject.asObservable();

    constructor() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.itemsSubject.next(JSON.parse(savedCart));
        }
    }

    addToCart(product: Product) {
        const currentItems = this.itemsSubject.value;
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
            this.itemsSubject.next([...currentItems]);
        } else {
            const newItem: CartItem = { ...product, quantity: 1 };
            this.itemsSubject.next([...currentItems, newItem]);
        }
        this.saveCart();
    }

    updateQuantity(productId: string, quantity: number) {
        const currentItems = this.itemsSubject.value;
        const item = currentItems.find(i => i.id === productId);
        if (item) {
            item.quantity = quantity;
            this.itemsSubject.next([...currentItems]);
            this.saveCart();
        }
    }

    removeFromCart(productId: string) {
        const filteredItems = this.itemsSubject.value.filter(item => item.id !== productId);
        this.itemsSubject.next(filteredItems);
        this.saveCart();
    }

    clearCart() {
        this.itemsSubject.next([]);
        this.saveCart();
    }

    private saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.itemsSubject.value));
    }

    getCartCount(): number {
        return this.itemsSubject.value.reduce((acc, item) => acc + item.quantity, 0);
    }
}
