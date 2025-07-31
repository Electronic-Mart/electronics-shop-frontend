import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAdminDashboard } from './analyticsAPI'

export const getAdminDashboard = createAsyncThunk(
  'admin/fetchDashboard',
  async (token, thunkAPI) => {
    try {
      const data = await fetchAdminDashboard(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  products: [],
  analytics: {},
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        const { users, products, analytics } = action.payload;
        state.users = users || [];
        state.products = products || [];
        state.analytics = analytics || {};
        state.loading = false;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch admin data';
      });
  },
});

export default adminSlice.reducer;
