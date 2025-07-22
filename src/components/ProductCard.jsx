import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
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
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
  };

  const handleDecrement = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (quantity > 1) {
      dispatch(removeFromCart(product.id));
    } else if (quantity === 1) {
      dispatch(removeFromCart(product.id));
      setShowControls(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p className="product-price">Ksh {product.price.toLocaleString()}</p>

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
            View Your Cart
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
