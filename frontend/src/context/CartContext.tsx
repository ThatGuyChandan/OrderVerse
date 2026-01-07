'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  getItemQuantity: (itemId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems.filter((i) => i.id !== itemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const getItemQuantity = (itemId: string) => {
    return cartItems.find((item) => item.id === itemId)?.quantity || 0;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, getItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
