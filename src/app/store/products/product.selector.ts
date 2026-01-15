import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductsState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  state => state.products
);

export const selectProductById = (productId: number) => createSelector(
  selectProductsState,
  state => state.products.find(product => product.id === productId)
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  state => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  state => state.error
);
