import { Observable } from 'rxjs';
import { CartItem } from '../../store/cart/cart.reducer';
import {selectCartItems,selectCartTotal} from '../../store/cart/cart.selector';
import {addToCart,removeFromCart,clearCart, updateCartItemQuantity} from '../../store/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';


@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  shippingCost = 0;
  discountCode = '';
  discount = 0;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.totalPrice$ = this.store.select(selectCartTotal);
  }

  removeItem(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }));
  }

  updateQuantity(item: CartItem, quantity: number): void {
  if (quantity <= 0) {
    this.removeItem(item.id);
  } else {
    this.store.dispatch(updateCartItemQuantity({ 
      productId: item.id, 
      quantity 
    }));
  }
}

  clearCart(): void {
    this.store.dispatch(clearCart());
  }

  onShippingChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.shippingCost =
      value === 'express' ? 120 :
      value === 'standard' ? 50 : 0;
  }

  applyDiscount(total: number): void {
    if (this.discountCode.toLowerCase() === 'save10') {
      this.discount = total * 0.1;
    } else {
      this.discount = 0;
      alert('Invalid discount code');
    }
  }

  grandTotal(total: number): number {
    return total + this.shippingCost - this.discount;
  }
}
