import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as fetchProductsFromAPI } from './productAPI';

// 1. Async thunk to fetch from live API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const data = await fetchProductsFromAPI();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 2. Slice setup
const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((product) => product.id !== action.payload);
    },
    setProducts: (state, action) => {
      state.list = action.payload;
    },
  },
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

// ✅ Export setProducts too
export const { addProduct, deleteProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;
