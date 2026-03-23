import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

  if (password !== confirmpassword) {
  alert("Passwords do not match ❌");
  return;
  }

    try {
      await API.post("register/", {
        username,
        email,
        password
      });

      alert("Registration Successful ✅");
      navigate("/login");

    } catch (err) {
      alert("Registration Failed ❌");
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 py-25">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
    
        <h2 className="text-3xl font-bold text-center mb-6">
          Register 📝
        </h2>
  <form onSubmit={handleRegister } className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
     
        <button
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Register
        </button>
  </form>
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;