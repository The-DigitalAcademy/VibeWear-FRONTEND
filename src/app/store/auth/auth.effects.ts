import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';


@Injectable()
export class AuthEffects {

  //register
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAction),
      exhaustMap(({ user }) =>
        this.authService.registerUser(user).pipe(
          map((user: User) =>
            AuthActions.registerSuccess({
              user,
              successMessage: 'Registration successful!',
            })
          ),
          catchError((error) =>
            of(
              AuthActions.registerFailure({
                errorMessage: error?.message ?? 'Registration failed',
              })
            )
          )
        )
      )
    )
  );

  // Navigate after successful registration
  registerSuccessNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  //login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      exhaustMap(({ user }) =>
        this.authService.loginUser(user).pipe(
          map((user: User) =>
            AuthActions.loginSuccess({
              user,
              successMessage: 'Login successful!',
            })
          ),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                errorMessage: error?.message ?? 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  // Navigate after successful login
  loginSuccessNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/tasks']))
      ),
    { dispatch: false }
  );

    //logout
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutAction),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
