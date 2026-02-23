import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Product, Review } from '../../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  newReview: any = {
    rating: 5,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productService.getProductById(id).subscribe(product => {
          this.product = product;
          if (!product) {
            this.router.navigate(['/shop']);
          }
        });
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert(`${this.product.name} added to cart!`);
    }
  }

  submitReview() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.newReview.comment.trim()) {
      alert('Please enter a comment.');
      return;
    }

    this.productService.addReview(this.product!.id, {
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      rating: this.newReview.rating,
      comment: this.newReview.comment
    }).subscribe(updatedProduct => {
      this.product = updatedProduct;
      this.newReview = { rating: 5, comment: '' };
      alert('Review submitted successfully!');
    });
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }
}
