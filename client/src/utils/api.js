import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://user-mngmt-stealth.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  }
);

export default api;
