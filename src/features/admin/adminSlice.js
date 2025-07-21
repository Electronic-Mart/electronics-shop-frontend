import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  products: [],
  analytics: {},
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
  },
});

export const { setUsers, setProducts, setAnalytics } = adminSlice.actions;
export default adminSlice.reducer;
