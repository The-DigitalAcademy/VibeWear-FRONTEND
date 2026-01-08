import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

// REGISTER
export const registerAction = createAction(
  '[Auth] Register',
  props<{ user: Omit<User, 'id'> }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; successMessage: string }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ errorMessage: string }>()
);

// LOGIN
export const loginAction = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; successMessage: string }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string }>()
);

// LOGOUT
export const logoutAction = createAction('[Auth] Logout');
