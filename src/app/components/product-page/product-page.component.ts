import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/products/product.actions';
import { selectAllProducts } from '../../store/products/product.selector';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'product-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  products$ = this.store.select(selectAllProducts);
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private store: Store,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  addToCart(product: any): void {
    // Subscribe once to check authentication
    this.isAuthenticated$.subscribe(isAuth => {
      if (!isAuth) {
        // User not logged in → redirect to login
        this.router.navigate(['/login']);
        return;
      }

      // User logged in → add product to cart
      this.cartService.addToCart(product);
    }).unsubscribe(); // unsubscribe immediately to avoid memory leaks
  }

  onSelectProduct(productId: number): void {
    this.router.navigate(['products', productId]);
  }
}
