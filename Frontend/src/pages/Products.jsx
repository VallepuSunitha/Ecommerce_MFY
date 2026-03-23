import { Link , useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import { WishlistContext } from "../context/WishlistContext";




function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const categoryFromURL = params.get("category");//

const { wishlist, toggleWishlist } = useContext(WishlistContext);

useEffect(() => {
  if (categoryFromURL) {
    setCategory(categoryFromURL);
  }
}, [categoryFromURL]); //

  useEffect(() => {
  API.get("products/")
    .then(res => {
      setProducts(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
}, []);
if (loading) {
  return <h2 className="text-center text-xl mt-10">Loading products...</h2>;
}
  const filteredProducts = products.filter(product => {

  const matchesSearch = search
    ? product.name.toLowerCase().includes(search.toLowerCase())
    : true;

  const matchesCategory =
    category === "All" || product.category === category;

  return matchesSearch && matchesCategory;

});

  return (
    <div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-8">
  {["All", "Clothing", "Jewellery", "Gifts"].map((cat) => (
    <button
      key={cat}
      onClick={() => setCategory(cat)}
      className={`py-3 rounded-lg font-medium capitalize transition-all duration-300
        ${category === cat 
          ? "bg-blue-500 text-white shadow-lg scale-105" 
          : "bg-gray-300 hover:bg-gray-400"}
      `}
    >
      {cat}
    </button>
  ))}
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{filteredProducts.map(product => (

  <div
    key={product.id}
    className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300"
  >

{/* ❤️ Wishlist Button */}
<button
  onClick={() => toggleWishlist(product)}
  className="absolute top-2 right-2 text-2xl z-10"
>
  {wishlist.find(item => item.id === product.id) ? "❤️" : "🤍"}
</button>
    {/* Image */}
    {/* Info */}
    <div className="mt-4">

      <Link to={`/products/${product.id}`}>
          <div className="overflow-hidden rounded">
      
      
      <img
        src={product.image}
        className="w-full h-48 object-cover hover:scale-110 transition duration-300"
      />
    </div>
        <h3 className="text-lg font-semibold hover:text-blue-500">
          {product.name}
        </h3>
      </Link>

      <p className="text-gray-600 text-sm mt-1">
        {product.description}
      </p>

      <p className="text-xl font-bold mt-2 text-green-600">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add to Cart 🛒
      </button>

    </div>

  </div>

))}

</div>
    </div>
  );
}

export default Products;
