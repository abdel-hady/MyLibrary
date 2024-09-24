// src/api/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Base URL for the API
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any custom headers here, e.g., authorization
    const token = localStorage.getItem("token"); // Replace with your token logic
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data; // Return the data directly
  },
  (error) => {
    // Handle errors globally
    console.error("API Error:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
