import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import itemReducer from './slices/itemSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    item: itemReducer,
  },
});
