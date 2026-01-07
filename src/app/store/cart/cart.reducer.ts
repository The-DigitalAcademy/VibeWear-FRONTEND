import { createReducer, on } from '@ngrx/store';
import {  } from './cart.actions';
import { Product } from 'src/app/services/productserv.service';

export const CART_FEATURE_KEY = 'cart';

export interface CartState {
    items: Product[];
}

export const cartInitialState: CartState = {
    items: []
};

export const cartReducer = createReducer(
  cartInitialState,

);