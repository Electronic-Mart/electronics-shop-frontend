import React from 'react';
import { useSelector } from 'react-redux';
import '../index.css'; // or create a dedicated Cart.css if preferred

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items); // assuming state.cart.items
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is currently empty.</p>
      ) : (
        <div className="cart-content">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="cart-product-info">
                    <img src={item.image} alt={item.name} className="cart-img" />
                    <span>{item.name}</span>
                  </td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <div className="cart-buttons">
              <button className="continue-btn">Continue Shopping</button>
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
