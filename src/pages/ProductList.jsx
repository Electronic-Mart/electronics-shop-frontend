import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import '../index.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = list.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <aside className="sidebar">
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <h3>Categories</h3>
        <ul className="category-list">
          <li onClick={() => setCategoryFilter('all')}>All</li>
          <li onClick={() => setCategoryFilter('laptop')}>Laptops</li>
          <li onClick={() => setCategoryFilter('phone')}>Phones</li>
          <li onClick={() => setCategoryFilter('accessory')}>Accessories</li>
        </ul>
      </aside>

      <section className="product-list">
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default ProductList;
