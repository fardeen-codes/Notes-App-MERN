// Import axios for making HTTP requests
import axios from "axios";

// Create a custom axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Backend API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {

  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  // Attach token to Authorization header if it existe
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return updated config
  return config;
});

// Export the instance for reuse
export default axiosInstance;