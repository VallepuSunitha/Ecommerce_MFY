// 




import axios from "axios";

const API = axios.create({
  baseURL: 
  "http://127.0.0.1:8000/api/"
});

// ✅ Attach token ONLY when needed
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  // ❗ Skip token for public APIs
  if (
    token &&
    !config.url.includes("products") &&
    !config.url.includes("login") &&
    !config.url.includes("register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;