import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { checkoutCart, checkoutCartFailure, checkoutCartSuccess } from "./cart.actions";
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

 checkoutCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(checkoutCart),
    concatLatestFrom(() => [
      this.store.select(selectCartCount),
      this.store.select(selectCartTotal),
      this.store.select(selectCartItems)
    ]),
    switchMap(([, totalItems, totalAmount, items]) => {
      const payload: CartRequest = { totalItems, totalAmount, items };

      return this.cartService.syncCartTotals(payload).pipe(
        map(response => checkoutCartSuccess({ response })),
        catchError(error => of(checkoutCartFailure({ error })))
      );
    })
  )
);



  
}