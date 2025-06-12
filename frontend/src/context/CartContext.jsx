import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success(`${product.title} quantity increased in the cart`, {
          position: "top-right",
          autoClose: 2000,
        });
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(` added to the cart`, {
          position: "top-right",
          autoClose: 2000,
        });
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      toast.warn(`${product.name} removed from the cart`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    const product = cart.find((item) => item.id === productId);
    if (product) {
      toast.success(
        `${product.title} quantity updated to ${quantity}`,
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = (paymentMethod) => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getCartAmount(),
      paymentMethod,
      date: new Date().toISOString(),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCart([]);
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const value = {
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    placeOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
