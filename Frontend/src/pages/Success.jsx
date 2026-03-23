import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for your purchase ❤️
      </p>

      <Link to="/">
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Continue Shopping
        </button>
      </Link>

    </div>
  );
}

export default Success;