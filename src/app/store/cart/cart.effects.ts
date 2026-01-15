import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { checkoutCart, checkoutCartFailure, checkoutCartSuccess, loadCart, loadCartFailure, loadCartSuccess } from "./cart.actions";
import { CartRequest } from "src/app/models/cart-request.model";
import { selectCartCount, selectCartItems, selectCartTotal } from "./cart.selector";
import { Store } from "@ngrx/store";
import { CartService } from "src/app/services/cart.service";

@Injectable()
export class CartEffects {
  private apiUrl = 'http://localhost:9090/cart/order';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store,
    private cartService: CartService
  ) {}

  // Effect to handle cart checkout process
  checkoutCart$ = createEffect(() =>
    this.actions$.pipe(
      // Listen for checkout action
      ofType(checkoutCart),
      // Get latest cart data from store
      concatLatestFrom(() => [
        this.store.select(selectCartCount),
        this.store.select(selectCartTotal),
        this.store.select(selectCartItems)
      ]),
      // Send cart data to backend
      switchMap(([, totalItems, totalAmount, items]) => {
        const payload: CartRequest = { totalItems, totalAmount, items };

        return this.cartService.syncCartTotals(payload).pipe(
          // Dispatch success action on successful checkout
          map(response => checkoutCartSuccess({ response })),
          // Dispatch failure action on error
          catchError(error => of(checkoutCartFailure({ error })))
        );
      })
    )
  );

  // Effect to load cart items from backend
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      // Listen for load cart action
      ofType(loadCart),
      // Fetch cart items from service
      mergeMap(() =>
        this.cartService.getCartItems().pipe(
          // Dispatch success action with loaded items
          map(items => loadCartSuccess({ items })),
          // Dispatch failure action on error
          catchError(error =>
            of(loadCartFailure({ error }))
          )
        )
      )
    )
  );
}