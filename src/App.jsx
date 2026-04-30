import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {
  // State: array of cart items (each item has product fields + quantity)
  const [cart, setCart] = useState([]);

  // State: whether the cart sidebar is open
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add to cart: if item exists, increase quantity; otherwise add new item
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove an item from the cart by its id
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity; remove item if quantity drops to 0 or below
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Toggle cart sidebar open/closed
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Count total number of individual items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="app">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
      />
      <main className="main-content">
        <ProductList
          products={products}
          onAddToCart={addToCart}
        />
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      {/* Overlay to close cart when clicking outside */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={toggleCart} />
      )}
    </div>
  );
}

export default App;
