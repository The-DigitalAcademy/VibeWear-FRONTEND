import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoadingSelector = createSelector(
  selectAuthState,
  (state) => state.isLoading
);

export const errorSelector = createSelector(
  selectAuthState,
  (state) => state.error
);

export const userSelector = createSelector(
  selectAuthState,
  (state) => state.user
);