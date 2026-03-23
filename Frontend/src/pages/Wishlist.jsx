import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { useEffect, useState ,useContext} from "react";
import API from "../services/api";

function Wishlist() {

  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        My Wishlist ❤️
      </h2>

      {wishlist.length === 0 && (
        <p>No items in wishlist</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {wishlist.map(item => (
          <div key={item.id} className="bg-white shadow p-4 rounded">

{/* <Link to={`/products/${item._id}`}>
  <img
    src={item.image}
    className="h-40 w-full object-cover hover:scale-105 transition"
  />

  <h3 className="mt-2 font-semibold hover:text-blue-500">
    {item.name}
  </h3>
</Link> */}

      <Link to={`/products/${item.id}`}>
      <img
        src={item.image}
        className="h-40 w-full object-cover hover:scale-105 transition"
      />
        <h3 className="mt-2 font-semibold hover:text-blue-500">
          {item.name}
        </h3>
      </Link>

            <p className="text-green-600 font-bold">
              ₹{item.price}
            </p>

            <button
              onClick={() => toggleWishlist(item)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove ❌
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Wishlist;