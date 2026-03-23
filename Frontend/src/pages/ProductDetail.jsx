import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  useEffect(() => {
    API.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) {
  return <h2 className="text-center mt-10">Loading product...</h2>;
}
  return (
<div className="p-6 max-w-5xl mx-auto">

  <div className="grid md:grid-cols-2 gap-8">

    {/* LEFT - IMAGE */}
    <div className="relative overflow-hidden rounded-lg">
      
      {/* ❤️ Wishlist Button */}
<button
  onClick={() => toggleWishlist(product)}
  className="absolute top-2 right-2 text-3xl bg-white rounded-full p-1 shadow z-50"
>
  {wishlist.find(item => item.id === product.id) ? "❤️" : "🤍"}
</button>

      <img
        src={product.image}
        className="w-full h-96 object-cover hover:scale-105 transition duration-300"
      />
    </div>

    {/* RIGHT - DETAILS */}
    <div>

      <h1 className="text-3xl font-bold mb-4">
        {product.name}
      </h1>

      <p className="text-gray-600 mb-4">
        {product.description}
      </p>

      <p className="text-2xl text-green-600 font-bold mb-6">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Add to Cart 🛒
      </button>

    </div>

  </div>

</div>
  );
}

export default ProductDetail;
