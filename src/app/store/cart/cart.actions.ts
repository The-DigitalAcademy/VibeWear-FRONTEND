import { createAction } from '@ngrx/store';

// ADD TO CART ACTIONS
export const addToCart = createAction('[Cart Component] Add To Cart');
export const addToCartSuccess = createAction('[Cart Component] Add To Cart Success');
export const addToCartFailure = createAction('[Cart Component] Add To Cart Failure');

// REMOVE FROM CART ACTIONS
export const removeFromCart = createAction('[Cart Component] Remove From Cart');
export const removeFromCartSuccess = createAction('[Cart Component] Remove From Cart Success');
export const removeFromCartFailure = createAction('[Cart Component] Remove From Cart Failure');

// CLEAR CART ACTIONS
export const clearCart = createAction('[Cart Component] Clear Cart');
export const clearCartSuccess = createAction('[Cart Component] Clear Cart Success');
export const clearCartFailure = createAction('[Cart Component] Clear Cart Failure');