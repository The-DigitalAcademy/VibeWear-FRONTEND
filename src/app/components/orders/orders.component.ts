// orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  carts: Cart[] = [];
  loading = false;
  error: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCarts();
  }

  loadCarts(): void {
    this.loading = true;
    this.cartService.getGroupedCarts().subscribe({
      next: carts => {
        this.carts = carts;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load carts', err);
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  getCartTotal(cart: Cart): number {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
