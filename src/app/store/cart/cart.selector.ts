import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CART_FEATURE_KEY } from './cart.reducer';

// Select the cart feature state from the store
export const selectCartState =
  createFeatureSelector<CartState>(CART_FEATURE_KEY);

// Select all items in the cart
export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
);

// Calculate total price of all items in cart
export const selectCartTotal = createSelector(
  selectCartItems,
  items =>
    items.reduce(
      (total, item) => total + item.price * item.quantity, 0
    )
);

// Calculate total number of items in cart (sum of all quantities)
export const selectCartCount = createSelector(
  selectCartItems,
  items => items.reduce((sum, item) => sum + item.quantity, 0)
);