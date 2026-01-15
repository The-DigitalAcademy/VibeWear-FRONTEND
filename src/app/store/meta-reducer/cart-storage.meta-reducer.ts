import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { CartState } from '../cart/cart.reducer';

const CART_STORAGE_KEY = 'cart_state';

/**
 * Meta-reducer that persists cart state to localStorage
 * and restores it on app initialization
 */
export function cartStorageMetaReducer(
  reducer: ActionReducer<CartState>
): ActionReducer<CartState> {
  return (state, action) => {
    // On app initialization, restore cart from localStorage
    if (action.type === INIT || action.type === UPDATE) {
      const savedState = localStorage.getItem(CART_STORAGE_KEY);
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch {
          // Remove corrupted data
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    }

    // Run the normal reducer to get the next state
    const nextState = reducer(state, action);
    
    // Save the updated state to localStorage
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextState));
    
    return nextState;
  };
}