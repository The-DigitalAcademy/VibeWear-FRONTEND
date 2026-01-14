import { CartItem } from "./cart-item.model";
import { Product } from "./product.model";

export interface Cart {
  cartId: number;
  totalItems: number;
  totalAmount: number;
  items: CartItem[];
}