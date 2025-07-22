import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login'; 
import Register from '../pages/Register';
import AboutUs from '../pages/AboutUs.jsx';
import Contacts from '../pages/Contacts.jsx';
import ProductList from '../pages/ProductList';
import Cart from '../pages/Cart.jsx';

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
    </Routes>
  );
};

export default AppRoutes;
