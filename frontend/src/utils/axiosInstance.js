// axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // or your backend URL
});

// ⭐ Intercept every request and attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
