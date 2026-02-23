import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartCount: number = 0;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {
    this.cartService.items$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}