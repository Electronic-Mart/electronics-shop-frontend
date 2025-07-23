import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  orders: [], // current & past orders
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: JSON.parse(localStorage.getItem('userProfile')) || initialState,
  reducers: {
    setProfile: (state, action) => {
      const { name, email, password, phone } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      state.phone = phone;
      localStorage.setItem('userProfile', JSON.stringify(state));
    },
    updateProfile: (state, action) => {
      Object.assign(state, action.payload);
      localStorage.setItem('userProfile', JSON.stringify(state));
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem('userProfile', JSON.stringify(state));
    },
    clearProfile: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem('userProfile');
    },
  },
});

export const { setProfile, updateProfile, addOrder, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
