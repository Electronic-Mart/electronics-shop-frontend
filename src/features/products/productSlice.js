import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Get initial products from localStorage or use default hardcoded list
const defaultProducts = [
  {
    id: 1,
    name: 'MacBook Pro',
    category: 'laptop',
    price: 40999,
    image: '/products/macbook-pro.jpg',
  },
  {
    id: 2,
    name: 'iPhone 13',
    category: 'phone',
    price: 39950,
    image: '/products/iphone-13.jpg',
  },
  {
    id: 3,
    name: 'Sony Headphones',
    category: 'accessory',
    price: 889,
    image: '/products/sony-headphones.jpg',
  },
];

const getInitialProducts = () => {
  const stored = JSON.parse(localStorage.getItem('reduxProducts'));
  return stored && Array.isArray(stored) ? stored : defaultProducts;
};

// 2. Async thunk for fetching products (if needed for future API)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      return defaultProducts;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 3. Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: getInitialProducts(),
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem('reduxProducts', JSON.stringify(state.list));
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((product) => product.id !== action.payload);
      localStorage.setItem('reduxProducts', JSON.stringify(state.list));
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

        // Only set if localStorage is empty — don't overwrite added products
        const stored = JSON.parse(localStorage.getItem('reduxProducts'));
        if (!stored || stored.length === 0) {
          state.list = action.payload;
          localStorage.setItem('reduxProducts', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
