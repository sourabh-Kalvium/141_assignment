import React from 'react';
import '../styles/CartSidebar.css';

function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  // Calculate total price of all cart items
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>

      {/* Sidebar Header */}
      <div className="cart-header">
        <h2 className="cart-title">🛍️ Your Cart</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close cart">
          ✕
        </button>
      </div>

      {/* Cart Items List */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p className="empty-cart-icon">🛒</p>
            <p className="empty-cart-text">Your cart is empty</p>
            <p className="empty-cart-sub">Add some products to get started!</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <p className="cart-item-subtotal">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Footer with Total */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span className="total-label">Total</span>
            <span className="total-amount">${calculateTotal().toFixed(2)}</span>
          </div>
          <button className="checkout-btn">
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
