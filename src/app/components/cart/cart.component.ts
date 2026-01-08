import { Observable } from 'rxjs';
import { CartItem } from '../../store/cart/cart.reducer';
import {selectCartItems,selectCartTotal} from '../../store/cart/cart.selector';
import {addToCart,removeFromCart,clearCart} from '../../store/cart/cart.actions';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckOutPopUpComponent } from '../check-out-pop-up/check-out-pop-up.component';
import { Store } from '@ngrx/store';


@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, RouterModule, CheckOutPopUpComponent],
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
      const diff = quantity - item.quantity;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          this.store.dispatch(addToCart({ product: item }));
        }
      }
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
