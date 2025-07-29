import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/Home';
import Login from '../pages/Login'; 
import Register from '../pages/Register';
import AboutUs from '../pages/AboutUs.jsx';
import Contacts from '../pages/Contacts.jsx';
import ProductList from '../pages/ProductList';
import Cart from '../pages/Cart.jsx';
import Checkout from '../pages/Checkout.jsx';
import Profile from '../pages/Profile.jsx';
import AdminDashboard from '../pages/AdminDashboard';
import ManageProducts from '../pages/ManageProducts';
import ManageUsers from '../pages/ManageUsers';
import Analytics from '../pages/Analytics';
import ProductDetails from '../pages/ProductDetails'; 

<Route path="/product/:id" element={<ProductDetails />} />


const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  return isAuthenticated && role === 'admin' ? children : <Navigate to="/products" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contacts />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Admin-only routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
    </Routes>
  );
};

export default AppRoutes;
