import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-gear-provider',
  templateUrl: './gear-provider.component.html',
  styleUrls: ['./gear-provider.component.css']
})
export class GearProviderComponent implements OnInit {
  products: Product[] = [];
  currentUser: User | null = null;

  // UI State
  showModal = false;
  isEditing = false;
  currentProduct: Partial<Product> = this.getEmptyProduct();

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    if (this.currentUser) {
      this.productService.getProductsByProvider(this.currentUser.id).subscribe(products => {
        this.products = products;
      });
    }
  }

  getEmptyProduct(): Partial<Product> {
    return {
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=500',
      stock: 0,
      providerId: this.currentUser?.id || ''
    };
  }

  openAddModal(): void {
    this.isEditing = false;
    this.currentProduct = this.getEmptyProduct();
    this.showModal = true;
  }

  openEditModal(product: Product): void {
    this.isEditing = true;
    this.currentProduct = { ...product };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveProduct(): void {
    if (this.isEditing && this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.addProduct(this.currentProduct as any).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this gear?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  // Stats Helpers
  get totalItems(): number {
    return this.products.length;
  }

  get totalStock(): number {
    return this.products.reduce((acc, p) => acc + p.stock, 0);
  }
}
