import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);


export const selectAuthLoading = createSelector(
  selectAuthState, state => state.isLoading);

export const selectAuthError = createSelector(
  selectAuthState,
   state => state.error);

export const selectAuthSuccessMessage = createSelector(
  selectAuthState,
   state => state.successMessage);
