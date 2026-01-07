import { createAction } from '@ngrx/store';

export const loadProducts = createAction('[Products Component] Load Products');
export const loadProductsSuccess = createAction('[Products Component] Load Products Success');
export const loadProductsFailure = createAction('[Products Component] Load Products Failure');