import { createAction } from '@ngrx/store';

// REGISTER ACTIONS
export const RegisterAction = createAction('[Auth Component] Register');
export const RegisterSuccessAction = createAction('[Auth Component] Register Success');
export const RegisterFailureAction = createAction('[Auth Component] Register Failure');

// LOGIN ACTIONS
export const LoginAction = createAction('[Auth Component] Login');
export const LoginSuccessAction = createAction('[Auth Component] Login Success');
export const LoginFailureAction = createAction('[Auth Component] Login Failure');

// LOGOUT ACTIONS
export const LogoutAction = createAction('[Auth Component] Logout');
export const LogoutSuccessAction = createAction('[Auth Component] Logout Success');
export const LogoutFailureAction = createAction('[Auth Component] Logout Failure');