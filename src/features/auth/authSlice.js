import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authAPI';

// Load from localStorage
const storedUser = JSON.parse(localStorage.getItem('authUser'));
const storedToken = localStorage.getItem('authToken');
const storedRole = localStorage.getItem('authRole');

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  role: storedRole || '',
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

// Thunk: login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const data = await loginUser(credentials); // { user, token }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Thunk: register
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await registerUser(userData); // { user, token }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = '';
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
      localStorage.removeItem('authRole');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload || {};
        state.loading = false;
        state.user = user;
        state.token = token;
        state.role = user?.role || '';
        state.isAuthenticated = true;

        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        localStorage.setItem('authRole', user?.role || '');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, token } = action.payload || {};
        state.loading = false;
        state.user = user;
        state.token = token;
        state.role = user?.role || '';
        state.isAuthenticated = true;

        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        localStorage.setItem('authRole', user?.role || '');
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
