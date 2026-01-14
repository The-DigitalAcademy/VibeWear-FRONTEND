import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { addToCart, updateCartItemQuantity, removeFromCart, clearCart, checkoutCart, checkoutCartFailure, checkoutCartSuccess } from "./cart.actions";
import { CartRequest } from "src/app/models/cart-request.model";
import { selectCartCount, selectCartTotal } from "./cart.selector";
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
      ]),

      switchMap(([, totalItems, totalAmount]) => {
        const payload = { totalItems, totalAmount };

        return this.cartService.syncCartTotals(payload).pipe(
          map(response => checkoutCartSuccess({ response })),
          catchError(error => of(checkoutCartFailure({ error })))
        );
      })
    )
  );

  // addToCart$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(addToCart),
  //       switchMap(({ product }) =>
  //         this.http.post(this.apiUrl, {
  //           productId: product.id,
  //           title: product.title,
  //           price: product.price,
  //           image: product.image,
  //           quantity: 1
  //         })
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // updateQuantity$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(updateCartItemQuantity),
  //       switchMap(({ productId, quantity }) =>
  //         this.http.put(
  //           `${this.apiUrl}/${productId}?quantity=${quantity}`,
  //           {}
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // removeFromCart$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(removeFromCart),
  //       switchMap(({ productId }) =>
  //         this.http.delete(`${this.apiUrl}/${productId}`)
  //       )
  //     ),
  //   { dispatch: false }
  // );

  // clearCart$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(clearCart),
  //       switchMap(() => this.http.delete(this.apiUrl))
  //     ),
  //   { dispatch: false }
  // );
}