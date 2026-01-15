import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/products/product.actions';
import { selectAllProducts } from '../../store/products/product.selector';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from 'src/app/store/auth/auth.selector';
import { Product, ProductservService } from 'src/app/services/productserv.service';
import { addToCart } from 'src/app/store/cart/cart.actions';

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
  products : Product[] = [];

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.products$.subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
      this.store.dispatch(addToCart({ product }));
  }

  onSelectProduct(productId: number): void {
    this.router.navigate(['products', productId]);
  }
}
