import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductservService } from '../../services/productserv.service';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductsEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(products =>
            ProductActions.loadProductsSuccess({ products })
          ),
          catchError(error =>
            of(
              ProductActions.loadProductsFailure({
                error: error.message
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductservService
  ) {}
}
