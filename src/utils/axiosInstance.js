// // src/utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5500/api/v1", // your backend base URL
//   withCredentials: true, // allows cookies (JWT in cookies)
// });

// // Add token to headers automatically
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // JWT stored in localStorage

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle response errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Logout user automatically if token expired
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// GLOBAL ERROR HANDLER
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      "Something went wrong! Please try again.";

    // Show error toast globally
    toast.error(message);

    // If token expired → logout
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
