'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: ShippingAddress;
  paymentMethod: 'COD';
  status: 'Pending' | 'Accepted' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
  deliveryEstimate: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  freeDeliveryThreshold: number;
  placedOrders: Order[];
  placeOrder: (address: ShippingAddress) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const freeDeliveryThreshold = 300; // Free delivery above ₹300

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('mithila_cart');
    const storedOrders = localStorage.getItem('mithila_orders');
    
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
    
    if (storedOrders) {
      try {
        setPlacedOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error('Failed to parse orders data', e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mithila_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Save orders to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mithila_orders', JSON.stringify(placedOrders));
    }
  }, [placedOrders, isLoaded]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0 ? 0 : 30;
  const cartTotal = cartSubtotal + deliveryFee;

  const placeOrder = (address: ShippingAddress): Order => {
    const orderId = `MLD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cartItems],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      address,
      paymentMethod: 'COD',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      deliveryEstimate: '2 Hours' // Delivery within 2 hours for local areas
    };

    setPlacedOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setPlacedOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        freeDeliveryThreshold,
        placedOrders,
        placeOrder,
        updateOrderStatus,
      }}
    >
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
