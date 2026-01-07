import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/products/product.actions';
import { selectAllProducts } from '../../store/products/product.selector';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'product-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  products$ = this.store.select(selectAllProducts);

  constructor(
    private store: Store,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  onSelectProduct(productId: number): void {
    this.router.navigate(['products', productId]);
  }
}
