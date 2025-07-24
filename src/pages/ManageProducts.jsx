import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../components/AdminSidebar';
import { addProduct, deleteProduct } from '../features/products/productSlice';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      image: form.image,
      category: form.category,
    };
    dispatch(addProduct(newProduct));
    setForm({ name: '', price: '', image: '', category: '' });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main-content">
        <h2>Manage Products</h2>

        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="laptop">Laptop</option>
            <option value="phone">Phone</option>
            <option value="accessory">Accessory</option>
          </select>

          <button type="submit" className="add-btn">Add Product</button>
        </form>

        <div className="product-list-admin">
          {products.map((product) => (
            <div key={product.id} className="admin-product-card">
              <img src={product.image} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <p>Ksh {product.price.toLocaleString()}</p>
                <p>Category: {product.category}</p>
                <button onClick={() => handleDelete(product.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageProducts;
