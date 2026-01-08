import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { CartState } from '../cart/cart.reducer';

const CART_STORAGE_KEY = 'cart_state';

export function cartStorageMetaReducer(
  reducer: ActionReducer<CartState>
): ActionReducer<CartState> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const savedState = localStorage.getItem(CART_STORAGE_KEY);
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    }

    const nextState = reducer(state, action);

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextState));

    return nextState;
  };
}
