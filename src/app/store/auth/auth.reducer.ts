import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const authInitialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  authInitialState

);
