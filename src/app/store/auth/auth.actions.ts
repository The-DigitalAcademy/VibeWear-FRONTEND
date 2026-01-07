import { createAction, props } from "@ngrx/store";
import { User } from 'src/app/models/user.model';

// Register Actions
export const registerAction = createAction(
    "[Auth] Regitster",
    props<{ user: Omit<User,"id"> }>()      
)

export const registerSuccess = createAction(
    "[Auth] Register Success",
    props<{ user: User;successMessage: string }>()
)
export const registerFailure = createAction(
    "[Auth] Register Failure",
    props<{ errorMessage: string }>()
);

// Login Actions
export const loginAction = createAction(
  "[Auth] Login",
  props<{ user: User }>()
);
export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ user: User;successMessage: string }>()
);
export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ errorMessage: string }>()
);

// Logout Actions
export const logoutAction = createAction("[Auth] Logout");