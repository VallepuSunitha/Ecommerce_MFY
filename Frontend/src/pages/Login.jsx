import { useState } from "react";
import API from "../services/api";
import { useNavigate , Link} from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    API.post("login/", {
      username,
      password
    })
    .then(res => {
  localStorage.setItem("token", res.data.access);
  window.location.href="/"
})
    .catch(err => {
      alert("Invalid credentials");
    });
  }

  return (

     <div className="screen flex items-center justify-center bg-gray-100 py-40">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-black-500 text-sm mt-4">
          Don’t have an account?{" "} 
          <Link to="/register" className=" text-green-500 font-medium cursor-pointer">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;