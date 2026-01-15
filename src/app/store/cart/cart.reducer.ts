import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart, updateCartItemQuantity } from './cart.actions';
import { Product } from 'src/app/models/product.model';

// Feature key for cart state in the store
export const CART_FEATURE_KEY = 'cart';

// Cart item interface extending Product with quantity
export interface CartItem extends Product {
  quantity: number;
}

// Cart state structure
export interface CartState {
  items: CartItem[];
}

// Initial cart state with empty items array
export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,

  // Handle adding product to cart
  on(addToCart, (state, { product }) => {
    const existing = state.items.find(i => i.id === product.id);

    if (existing) {
      // If product exists, increment quantity
      return {
        ...state,
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }

    // If product doesn't exist, add it with quantity 1
    return {
      ...state,
      items: [...state.items, { ...product, quantity: 1 }]
    };
  }),

  // Handle removing product from cart
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== productId)
  })),

  // Handle clearing entire cart
  on(clearCart, state => ({
    ...state,
    items: []
  })),

  // Handle updating cart item quantity
  on(updateCartItemQuantity, (state, { productId, quantity }) => {
    const updatedItems = state.items
      .map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      .filter(item => item.quantity > 0); // Remove items with 0 or negative quantity

    return { ...state, items: updatedItems };
  }),
);