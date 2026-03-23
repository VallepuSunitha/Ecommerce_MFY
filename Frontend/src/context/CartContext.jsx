import { createContext, useState , useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const CartContext = createContext();
export function CartProvider({ children }) {
  
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  function addToCart(product) {

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      window.location.href = "/login"; // redirect to login
      return;
    }


    toast.success("Product added to cart 🛒");
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }
  function increaseQty(id) {
  setCart(
    cart.map(item =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  );
}

function decreaseQty(id) {
  setCart(
    cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    )
  );
}

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , increaseQty , decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
}
