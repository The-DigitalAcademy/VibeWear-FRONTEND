import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

// Initialize state from localStorage
const storedUser = localStorage.getItem('user');
const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

export const initialState: AuthState = {
  user: parsedUser,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  successMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginAction, AuthActions.registerAction, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { user}) => ({
    ...state,
    user: null, 
    isAuthenticated: false, 
    isLoading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    error: errorMessage,
  })),
  on(AuthActions.logoutAction, state => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error: null,
  }))
);
