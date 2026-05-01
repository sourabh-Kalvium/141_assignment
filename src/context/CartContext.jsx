import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('quickcart-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((currentCart) => {
      if (newQuantity <= 0) {
        return currentCart.filter((item) => item.id !== productId);
      }

      return currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const toggleCart = () => {
    setIsCartOpen((open) => !open);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cart,
    isCartOpen,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
