import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

// ADD TO CART
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

// REMOVE FROM CART
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

// CLEAR CART
export const clearCart = createAction('[Cart] Clear Cart');

// UDPDATE QUANTITY
export const updateCartItemQuantity = createAction(
  '[Cart] Update Cart Item Quantity',
  props<{ productId: number; quantity: number }>()
);

export const checkoutCart = createAction('[Cart] Checkout');

export const checkoutCartSuccess = createAction(
  '[Cart] Checkout Success',
  props<{ response: any }>()
);

export const checkoutCartFailure = createAction(
  '[Cart] Checkout Failure',
  props<{ error: any }>()
);