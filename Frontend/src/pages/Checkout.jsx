import API from "../services/api";
import { useContext ,useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"

function Checkout() {

  const { cart , setCart} = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty,0);

  const navigate = useNavigate()
  useEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) {
    navigate("/login")
  }
  }, [navigate])



function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }
  const orderData = cart.map(item => ({
    id: item.id,
    qty: item.qty
  }));

  API.post("orders/", orderData)
    .then(() => {
      alert("Order placed successfully 🎉");
      localStorage.removeItem("cart"); 
      navigate("/success");
    })
    .catch(err => console.log(err));
}




return(
   <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Checkout 🧾
      </h1>

      {/* Items */}
      <div className="space-y-4">

        {cart.map(item => (
          <div
            key={item.id}
            className="flex justify-between bg-white p-4 shadow rounded"
          >
            <p>{item.name} (x{item.qty})</p>
            <p>₹{item.price * item.qty}</p>
          </div>
        ))}

      </div>

      {/* Total */}
      <div className="mt-6 text-xl font-bold">
        Total: ₹{total}
      </div>

      {/* Button */}
{/* <button
  onClick={(placeOrder) => {
    alert("Order placed successfully 🎉");
    navigate("/success");
  }}
  className="mt-6 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
>
  Place Order
</button> */}
<button
  onClick={placeOrder}
  className="mt-6 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
>
  Place Order
</button>

    </div>
  );
}

export default Checkout;
