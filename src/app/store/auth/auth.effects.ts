import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAction),
      mergeMap(({ user }) =>
        this.authService.registerUser(user).pipe(
          map(registeredUser => {
            localStorage.setItem('user', JSON.stringify(registeredUser));
            return AuthActions.registerSuccess({
              user: registeredUser,
              successMessage: ''
            });
          }),
          tap(() => {
            this.router.navigate(['/']);
          }),
          catchError(error =>
            of(AuthActions.registerFailure({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      mergeMap(({ email, password, returnUrl }) =>
        this.authService.loginUser(email, password).pipe(
          map(user => AuthActions.loginSuccess({ user, successMessage: 'Login successful!', returnUrl })),
          tap(() => this.router.navigate([returnUrl])),
          catchError(error => of(AuthActions.loginFailure({ errorMessage: error.message })))
        )
      )
    )
  );

  logout$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.logoutAction),
      tap(() => {
        this.authService.logout();
        localStorage.removeItem('user'); 
        this.router.navigate(['/login']);
      })
    ),
  { dispatch: false }
);

}
