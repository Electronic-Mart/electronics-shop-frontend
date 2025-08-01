import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p className="product-price">Ksh {product.price.toLocaleString()}</p>

      <NavLink to={`/product/${product.id}`} className="view-details-btn">
        View More
      </NavLink>
    </div>
  );
};

export default ProductCard;
