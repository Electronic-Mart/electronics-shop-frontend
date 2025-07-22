import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      // Replace with real API call when ready
      const response = [
        {
          id: 1,
          name: 'MacBook Pro',
          category: 'laptop',
          price: 1999,
          image: '/products/macbook-pro.jpg',
        },
        {
          id: 2,
          name: 'iPhone 13',
          category: 'phone',
          price: 999,
          image: '/products/iphone-13.jpg',
        },
        {
          id: 3,
          name: 'Sony Headphones',
          category: 'accessory',
          price: 299,
          image: '/products/sony-headphones.jpg',
        },
      ];
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 2. Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},

  // 3. Extra reducers handle async thunk states
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
