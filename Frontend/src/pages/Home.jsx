import { useEffect, useState } from "react";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";

import { useNavigate } from "react-router-dom"; //

function Home() {

  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();//


  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data =>{
        setProducts(data)});
  }, []);


useEffect(() => {
  const interval = setInterval(() => {
    setCurrent(prev => (prev + 1) % banners.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

  
  const addToCart = async (id) => {
  const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ productId: id })
    });

    alert("Product added to cart");
  };


const banners = [Banner1,Banner2,Banner3
];
  
const [selectedCategory, setSelectedCategory] = useState("All");

const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="p-6">

<div className="mb-8">

  <div className="relative w-full h-64 overflow-hidden rounded-xl">

    <img
      src={banners[current]}
      className="w-full h-full object-cover transition-all duration-1000"
    />

  </div>

  {/* Dots */}
  <div className="flex justify-center mt-2 gap-2">
    {banners.map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full ${
          current === index ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>
    ))}
  </div>

</div>


<h2 className="text-2xl font-bold mb-4">
  Shop by Category
</h2>



<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

{["All", "Clothing",  "Jewellery", "Gifts"].map((category, index) => (
  <div
    key={index}
    // onClick={() => setSelectedCategory(category)}
    onClick={() => navigate(`/products?category=${category}`)} //
    className={`p-4 rounded-lg shadow text-center cursor-pointer transition 
      ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-white"}
    `}>
    <p className="font-semibold">{category}</p>
  </div>
))}

</div>




      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="relative border rounded-lg shadow-lg p-4 hover:shadow-2xl transition"
          >

            <img
              src={p.image}
              alt={p.name}
              className="h-48 w-full object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-2">
              {p.name}
            </h2>

            <p className="text-gray-600">
              ₹ {p.price}
            </p>

            <button
              onClick={() => addToCart(p._id)}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add To Cart
            </button>

          </div>
        ))}

      </div>
      


<div className=" bg-yellow-400 p-5 rounded-lg flex flex-col md:flex-row items-center justify-between">

  <h2 className="text-2xl font-bold">
    🎉 Flat 20% OFF on Handmade Items!
  </h2>

  <button className="bg-black text-white px-6 py-2 rounded mt-4 md:mt-0">
    Grab Now
  </button>

</div>



<footer className="overflow-hidden bg-black text-white rounded lg py-3 mt-10">
  <div
    className="whitespace-nowrap"
    style={{
      display: "inline-block",
      paddingLeft: "100%",
      animation: "scrollLeft 10s linear infinite"
    }}
  >
    © 2026 MadeForYou🛍️. Crafted with elegance✨. All rights reserved.
  </div>

  <style>
    {`
      @keyframes scrollLeft {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `}
  </style>
</footer>


    </div>
  );
}

export default Home;