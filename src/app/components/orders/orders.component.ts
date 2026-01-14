import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalItems = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: items => {
        this.cartItems = items;
        this.calculateTotals();
      },
      error: err => {
        console.error('Failed to load cart items', err);
      }
    });
  }

  calculateTotals(): void {
    this.totalItems = this.cartItems.reduce(
      (sum, item) => sum + item.quantity, 0
    );

    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
  }
}
