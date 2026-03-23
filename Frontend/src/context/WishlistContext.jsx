import { createContext, useState , useEffect } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();
export function WishlistProvider({ children }) {


const [wishlist, setWishlist] = useState(() => {
  const saved = localStorage.getItem("wishlist");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);


  function toggleWishlist(product) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to wishlist");
      window.location.href = "/login";
      return;
    }
    const exists = wishlist.find(item => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}