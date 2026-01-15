import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CartRequest } from "../models/cart-request.model";
import { Cart } from "../models/cart.model";

// Interface for cart item structure
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  // BehaviorSubject to manage cart state
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  // Observable for components to subscribe to cart changes
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {
    // Load saved cart from localStorage on initialization
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  private apiUrl = "http://localhost:9090/cart/order";

  // Fetch cart items from backend
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>("http://localhost:9090/cart/items", {
      withCredentials: true,
    });
  }

  // Fetch grouped cart sessions from backend
  getGroupedCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>("http://localhost:9090/cart/sessions", { 
      withCredentials: true 
    });
  }

  // Add product to cart or increment quantity if already exists
  addToCart(product: any): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Increment quantity if item already in cart
      existingItem.quantity += 1;
    } else {
      // Add new item to cart
      currentItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    // Update cart and persist to localStorage
    this.cartItems.next([...currentItems]);
    this.saveToLocalStorage();
  }

  // Remove item from cart by product ID
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value.filter(
      (item) => item.id !== productId
    );
    this.cartItems.next(currentItems);
    this.saveToLocalStorage();
  }

  // Update quantity of a specific cart item
  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find((item) => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        this.removeFromCart(productId);
      } else {
        // Update quantity and persist
        item.quantity = quantity;
        this.cartItems.next([...currentItems]);
        this.saveToLocalStorage();
      }
    }
  }

  // Calculate total number of items in cart
  getCartItemCount(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Calculate total price of all items in cart
  getTotalPrice(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Empty the cart and clear localStorage
  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem("cart");
  }

  // Save current cart state to localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem("cart", JSON.stringify(this.cartItems.value));
  }

  // Sync cart totals with backend
  syncCartTotals(payload: CartRequest): Observable<any> {
    console.log(payload);
    return this.http.post(this.apiUrl, payload, { withCredentials: true });
  }
}