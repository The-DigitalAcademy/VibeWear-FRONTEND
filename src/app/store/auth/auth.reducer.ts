import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false
  })),
  on(AuthActions.registerFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage
  })),

  on(AuthActions.loginAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false
  })),
  on(AuthActions.loginFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage
  })),

  on(AuthActions.logoutAction, (state) => ({
    ...state,
    user: null
  }))
);