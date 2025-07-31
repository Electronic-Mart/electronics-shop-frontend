import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import {
  addProduct,
  deleteProduct,
  setProducts,
} from '../features/products/productSlice';
import {
  fetchProducts,
  createProductAPI,
  deleteProductAPI,
} from '../features/products/productAPI';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.list);
  const role = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [form, setForm] = useState({
    name: '',
    price: '',
    image_url: '',
    category: '',
    description: '',
  });

  // 🔒 Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, role, navigate]);

  // 🔁 Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        dispatch(setProducts(data));
      } catch (err) {
        console.error('❌ Failed to load products:', err.message);
      }
    };
    loadProducts();
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      price: parseFloat(form.price),
    };
    try {
      const created = await createProductAPI(newProduct); // ✅ no token needed
      dispatch(addProduct(created));
      setForm({ name: '', price: '', image_url: '', category: '', description: '' });
    } catch (err) {
      console.error('❌ Failed to add product:', err.message);
      alert('Failed to add product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductAPI(id); // ✅ no token needed
      dispatch(deleteProduct(id));
    } catch (err) {
      console.error('❌ Failed to delete product:', err.message);
      alert('Failed to delete product.');
    }
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
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
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
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            required
          />
          <button type="submit" className="add-btn">Add Product</button>
        </form>

        <div className="product-list-admin">
          {products.map((product) => (
            <div key={product.id} className="admin-product-card">
              <img src={product.image_url} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <p>Ksh {product.price.toLocaleString()}</p>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
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
