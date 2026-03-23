import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";


function Cart() {
  const { cart, removeFromCart , increaseQty , decreaseQty} = useContext(CartContext);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,0
  );


  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">My Cart 🛒</h2>

      {cart.length === 0 && <p className="text-gray-600">Your Cart is empty</p>}



    <div className="space-y-4">
      {cart.map(item => (



<div
  key={item.id}
  className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4"
>

  {/* ✅ Image + Click */}
  <Link to={`/products/${item.id}`}>
    <img
      src={item.image}
      className="w-20 h-20 object-cover rounded hover:scale-105 transition"
    />
  </Link>

  {/* ✅ Product Info */}
  <div className="flex-1">
    <Link to={`/products/${item.id}`}>
      <h3 className="text-lg font-semibold hover:text-blue-500">
        {item.name}
      </h3>
    </Link>

    <p className="text-gray-600">₹{item.price}</p>

    {/* ✅ Quantity Controls */}
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={() => decreaseQty(item.id)}
        className="bg-gray-300 px-3 py-1 rounded"
      >
        -
      </button>

      <span className="font-semibold">{item.qty}</span>

      <button
        onClick={() => increaseQty(item.id)}
        className="bg-gray-300 px-3 py-1 rounded"
      >
        +
      </button>
    </div>
  </div>

  {/* ✅ Remove Button */}
  <button
    onClick={() => removeFromCart(item.id)}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Remove ❌
  </button>

</div>



//         <div key={item.id}  className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
//           <h3 className="text-lg font-semibold">{item.name}</h3>
//           <p className="text-gray-600">₹{item.price}</p>
      
// <div className="flex items-center gap-3">
//   <button
//   onClick={() => decreaseQty(item.id)}
//     className="bg-gray-300 px-3 py-1 rounded"
//   >
//     -
//   </button>
//   <span className="font-semibold">{item.qty}</span>
//   <button
//     onClick={() => increaseQty(item.id)}
//     className="bg-gray-300 px-3 py-1 rounded"
//   >
//     +
//   </button>
// </div>

//         <button onClick={() => removeFromCart(item.id)}className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove</button>
        
//         // <hr />
//         // </div>
      ))}
      </div>
      {cart.length>0&&(

      <div className="mt-6 bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold">Total: ₹{total}</h3>
      <Link to="/checkout">
      <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Proceed to Checkout</button>
      </Link>
      </div>
      )}
    </div>
  );
}

export default Cart;
