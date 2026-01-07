import { Product } from "./product.model";

export interface Cart {
    prodcut: Product;
    quantity: number;
}