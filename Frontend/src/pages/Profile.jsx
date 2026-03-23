import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    API.get("profile/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (

  <div className="flex justify-center items-center h-[70vh] bg-gray-100">
    
    <div className="bg-white p-8 rounded-2xl w-100 shadow-lg text-center">
      
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-blue-400 text-white flex items-center justify-center text-2xl mx-auto mb-1 ">
        {user.username[0].toUpperCase()}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Profile
      </h2>

      {/* Details */}
      <div className="text-left space-y-2">
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">User ID:</span> {user.id}</p>
      </div>

      {/* Logout Button */}
      <button
        className="mt-6 w-full py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition duration-200"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>

    </div>
  </div>
  );
}

export default Profile;