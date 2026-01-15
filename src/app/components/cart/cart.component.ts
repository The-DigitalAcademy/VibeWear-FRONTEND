import { Observable } from "rxjs";
import { CartItem } from "../../store/cart/cart.reducer";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import {
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  checkoutCart,
} from "../../store/cart/cart.actions";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { CheckOutPopUpComponent } from "../check-out-pop-up/check-out-pop-up.component";

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
      this.store.dispatch(
        updateCartItemQuantity({
          productId: item.id,
          quantity,
        })
      );
    }
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }

  grandTotal(total: number): number {
    return total;
  }

  checkout(): void {
    this.store.dispatch(checkoutCart());
  }
}
