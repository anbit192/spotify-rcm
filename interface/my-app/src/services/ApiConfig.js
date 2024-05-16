// ApiConfig.js
import axios from 'axios';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000, // 10 seconds timeout
  // You can add more configuration options here as needed
});

export default axiosInstance;
