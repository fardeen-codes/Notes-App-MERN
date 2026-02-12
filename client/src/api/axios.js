// import axios from "axios";

// // axios ka ek custom instance bana rahe hain
// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Request backend jaane se pehle kuch kaam karna
// api.interceptors.request.use(
//   (req) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     } else {
//       delete req.headers.Authorization;
//     }
//     return req;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
