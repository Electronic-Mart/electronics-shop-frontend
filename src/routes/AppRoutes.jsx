import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
//import Orders from '../pages/Orders';
import Analytics from '../pages/Analytics';


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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<ManageProducts />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AppRoutes;
