import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
    },
    placeOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { placeOrderStart, placeOrderSuccess, placeOrderFailure } = orderSlice.actions;
export default orderSlice.reducer;
