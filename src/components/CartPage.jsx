import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty</p>
          <Link to="/" className="back-home-link">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-page-content">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-page-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-page-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-page-item-price">${item.price.toFixed(2)}</p>
                  <p>{item.description}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-link"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items</span>
              <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <Link to="/" className="continue-shopping">
              ← Continue Shopping
            </Link>
            <button className="checkout-btn">Checkout Now</button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
