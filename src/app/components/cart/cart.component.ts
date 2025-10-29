import { Component, OnInit } from "@angular/core";
import { CartService, CartItem } from "../../services/cart.service"; // use this to import  the interface and the Service iself
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CheckOutPopUpComponent } from "../check-out-pop-up/check-out-pop-up.component"; // import the CheckOutPopUpComponent to be used in the cart component

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, RouterModule, CheckOutPopUpComponent],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  shippingCost = 0;
  discountCode: string = "";
  discount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  get grandTotal(): number {
    return this.totalPrice + this.shippingCost - this.discount;
  }

  onShippingChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.shippingCost = value === "express" ? 120 : 50;
    if (value === "free") {
      this.shippingCost = 0;
    }
    console.log("Selected shipping cost:", this.shippingCost);
  }

  applyDiscount(): void {
    this.discountCode = (document.getElementById("code") as HTMLInputElement).value;
    console.log("Applying discount code:", this.discountCode);
    if (this.discountCode.toLowerCase() === "save10") {
      this.discount = this.totalPrice * 0.1; // 10% off
    } else {
      this.discount = 0;
      alert("Invalid discount code");
    }
  }
}
