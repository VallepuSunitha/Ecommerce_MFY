import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyOrders() {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  API.get("my-orders/")
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
}, []);

  return (
  <div className="p-6 max-w-4xl mx-auto">

  <h2 className="text-3xl font-bold mb-6">My Orders 📦</h2>

  {orders.length === 0 && (
    <p className="text-gray-500">No orders yet</p>
  )}

  <div className="space-y-6">

    {orders.map((order, index) => (
      <div
        key={order.id}
        className="bg-white p-5 rounded-xl shadow-md"
      >

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Order #{index + 1}
          </h3>

          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        



<div className="space-y-3">
  {order.items.map((item, i) => (
    <div
      key={i}
      className="flex items-center justify-between border-b pb-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
      onClick={() => navigate(`/products/${item.id}`)}
    >

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        <img
          src={item.image}
          alt={item.product}
          className="w-16 h-16 object-cover rounded"
        />

        <div>
          <p className="font-medium">{item.product}</p>
          <p className="text-sm text-gray-500">
            Qty: {item.quantity}
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        onClick={(e) => {
          e.stopPropagation(); // prevent parent click
          navigate(`/products/${item.id}`);
        }}
      >
        Buy Again
      </button>

    </div>
  ))}
</div>




        {/* Status */}
        {/* <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 font-semibold">
            Delivered ✅
          </span>
        </div> */}

      </div>
    ))}

  </div>
</div>

);
}

export default MyOrders;