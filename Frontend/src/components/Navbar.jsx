import { Link } from "react-router-dom";
import { useContext , useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const { cart } = useContext(CartContext);
  const token = localStorage.getItem("token")
  const [search, setSearch] = useState("");
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();


  function handleLogout() {
  localStorage.removeItem("token")
  window.location.href = "/login"
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        MadeForYou 🛍️
      </h1>
      
    <div className="flex items-center gap-6">

  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/products?search=${value}`);
    }}
      className="px-3 py-1 rounded text-white"
  />



      <Link to="/" className="hover:text-yellow-400">
        Home
      </Link>

      <Link to="/products" className="hover:text-yellow-400">
        Products
      </Link>

      {token ?(<>
      <Link to="/cart" className="hover:text-yellow-400">Cart ({cart.length})</Link>
      <Link to="/wishlist" className="hover:text-yellow-400">Wishlist ❤️ ({wishlist.length})</Link> 
      <Link to="/my-orders" className="hover:text-yellow-400">My Orders</Link>
       {localStorage.getItem("token") && (
      <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
       )}
      <button onClick={handleLogout} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600" >Logout</button>
      </>):(
    <div className="flex gap-2">
      <Link
    to="/login"
    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
  >
    Register
  </Link>
</div>
      )}
      
     </div>
    </nav>
  );
}

export default Navbar;
