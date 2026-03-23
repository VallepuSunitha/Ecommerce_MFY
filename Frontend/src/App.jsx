import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Profile from "./pages/Profile";


function App() {
  return (
    
<BrowserRouter>
<div className="min-h-screen bg-gray-100">
  <Toaster position="top-right" />
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/success" element={<Success />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/register" element={<Register/>}/>
    <Route path="/profile" element={<Profile />} />
    
    <Route
    path="/checkout"
    element={
    <PrivateRoute>
      <Checkout />
    </PrivateRoute>
   }
   />
    <Route path="/login" element={<Login />} />
    <Route
    path="/my-orders"
    element={
    <PrivateRoute>
      <MyOrders />
    </PrivateRoute>
    }
    />
    

  </Routes>
  </div>
</BrowserRouter>

  );
}

export default App;

