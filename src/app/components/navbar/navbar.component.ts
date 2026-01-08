import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductservService } from '../../services/productserv.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutAction } from 'src/app/store/auth/auth.actions';
import { selectIsAuthenticated, selectUser } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;
  searchTerm = '';
  searchResults: any[] = [];
  showResults = false;
  isAuth: boolean = false;

  isAuthenticated$!: Observable<boolean>;
  user$!: Observable<{ username: string } | null>;

  constructor(
    private productService: ProductservService,
    private router: Router,
    private cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Cart count
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });

    // Auth state
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.isAuthenticated$.subscribe(value => this.isAuth = value);
    this.user$ = this.store.select(selectUser);
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.productService.getProducts().subscribe(products => {
        this.searchResults = products.filter(product =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showResults = true;
      });
    }
  }

  hideResults() {
    setTimeout(() => this.showResults = false, 200);
  }

  goToProduct(productId: number) {
    this.router.navigate(['/products', productId]);
    this.showResults = false;
  }
}
