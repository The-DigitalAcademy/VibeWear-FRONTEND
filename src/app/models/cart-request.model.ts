import { CartItem } from "./cart-item.model";

export interface CartRequest {
  totalItems: number;
  totalAmount: number;
  items: CartItem[]
}
