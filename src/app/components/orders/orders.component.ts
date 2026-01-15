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

  // Array to store all cart/order sessions
  carts: Cart[] = [];
  // Loading state for showing spinner/loading indicator
  loading = false;
  // Error message to display if loading fails
  error: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Load carts when component initializes
    this.loadCarts();
  }

  // Fetch all cart sessions from the backend
  loadCarts(): void {
    this.loading = true;
    this.cartService.getGroupedCarts().subscribe({
      next: carts => {
        // Store fetched carts and stop loading
        this.carts = carts;
        this.loading = false;
      },
      error: err => {
        // Handle error and display message to user
        console.error('Failed to load carts', err);
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  // Calculate total price for a specific cart
  getCartTotal(cart: Cart): number {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}