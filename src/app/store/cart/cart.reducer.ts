import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart } from './cart.actions';
import { Product } from 'src/app/models/product.model';

export const CART_FEATURE_KEY = 'cart';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,

  on(addToCart, (state, { product }) => {
    const existing = state.items.find(i => i.id === product.id);

    if (existing) {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }

    return {
      ...state,
      items: [...state.items, { ...product, quantity: 1 }]
    };
  }),

  on(removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== productId)
  })),

  on(clearCart, state => ({
    ...state,
    items: []
  }))
);
