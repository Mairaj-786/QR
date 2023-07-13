import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: `Design # 1`,
  price: 99,
  qrImage: '/images/qr-code-scanner.svg',
};

export const itemSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = itemSlice.actions;

export default itemSlice.reducer;
