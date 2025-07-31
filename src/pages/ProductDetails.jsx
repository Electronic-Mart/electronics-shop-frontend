import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import '../index.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.list);
  const product = products.find((p) => String(p.id) === id);

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product?.id)
  );

  const quantity = cartItem ? cartItem.quantity : 0;
  const [showControls, setShowControls] = useState(quantity > 0);

  useEffect(() => {
    if (quantity === 0) setShowControls(false);
  }, [quantity]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
    setShowControls(true);
  };

  const handleIncrement = () => {
    dispatch(addToCart(product));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(removeFromCart(product.id));
    } else if (quantity === 1) {
      dispatch(removeFromCart(product.id));
      setShowControls(false);
    }
  };

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <img src={product.image} alt={product.name} className="product-details-image" />
        <div className="product-details-info">
          <h2>{product.name}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> KES {product.price.toLocaleString()}</p>
          <p><strong>Description:</strong> {product.description || 'No description available.'}</p>

          {!showControls ? (
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <>
              <div className="quantity-controls">
                <button onClick={handleDecrement}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button className="view-cart-btn" onClick={() => navigate('/cart')}>
                View Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
