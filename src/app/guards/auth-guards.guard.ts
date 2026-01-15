import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectIsAuthenticated } from '../store/auth/auth.selector'; 

// Auth Guard to protect routes - allows access only to authenticated users
export const AuthGuardsGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  
  // Check authentication state from the store
  return store.select(selectIsAuthenticated).pipe(
    take(1), // Take only the first emission to avoid multiple checks
    map((isAuthenticated) => {
      if (isAuthenticated) {
        // Allow navigation if user is authenticated
        return true;
      } else {
        // Redirect to login page with return URL for post-login navigation
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }
    })
  );
};