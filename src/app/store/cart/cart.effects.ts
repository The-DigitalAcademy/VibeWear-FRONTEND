import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs";
import { addToCart, updateCartItemQuantity, removeFromCart, clearCart } from "./cart.actions";


@Injectable()
export class CartEffects {
  private apiUrl = 'http://localhost:8080/cart';

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  addToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCart),
        switchMap(({ product }) =>
          this.http.post(this.apiUrl, {
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
          })
        )
      ),
    { dispatch: false }
  );

  updateQuantity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCartItemQuantity),
        switchMap(({ productId, quantity }) =>
          this.http.put(
            `${this.apiUrl}/${productId}?quantity=${quantity}`,
            {}
          )
        )
      ),
    { dispatch: false }
  );

  removeFromCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeFromCart),
        switchMap(({ productId }) =>
          this.http.delete(`${this.apiUrl}/${productId}`)
        )
      ),
    { dispatch: false }
  );

  clearCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clearCart),
        switchMap(() => this.http.delete(this.apiUrl))
      ),
    { dispatch: false }
  );
}