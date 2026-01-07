import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/services/productserv.service';

export const PRODUCT_FEATURE_KEY = 'products';

export interface productState { 
    products: Product[];
};

export const productInitialState: productState = { 
    products: [] 
};   

export const productReducer = createReducer(
  productInitialState,

);