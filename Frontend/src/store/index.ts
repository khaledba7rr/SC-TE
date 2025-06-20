import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart-slice.ts';

import CartItem from '../types/cart-items.ts';

// Load from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

// Save to localStorage
const saveCartToStorage = (state: { cart: { items: CartItem[] } }) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error('Could not save cart', err);
  }
};

// Get the cart if it exists
const preloadedCart = loadCartFromStorage();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: preloadedCart || { items: [] }, // fallback if nothing is saved
  },
});

// Subscribe to store changes
store.subscribe(() => {
  saveCartToStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
