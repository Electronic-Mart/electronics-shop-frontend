import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('authUser'));
const storedToken = localStorage.getItem('authToken');
const storedRole = localStorage.getItem('authRole');

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  role: storedRole || '',
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { name, email, role } = action.payload;

      state.user = { name, email };
      state.token = 'mock-token';
      state.role = role;
      state.isAuthenticated = true;

      localStorage.setItem('authUser', JSON.stringify({ name, email }));
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('authRole', role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = '';
      state.isAuthenticated = false;

      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
      localStorage.removeItem('authRole');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
