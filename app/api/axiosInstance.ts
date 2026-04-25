import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { clearStorage } from "./auth.service.config.helper";

const nodeEnv = process.env.NODE_ENV;
const API_URL =
  nodeEnv === "development"
    ? process.env.EXPO_PUBLIC_API_URL_DEV
    : process.env.EXPO_PUBLIC_API_URL_PROD;
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";

    if (error.response?.status === 401) {
      console.log("Unauthorized access, clearing storage...");
      clearStorage();
      // Optionally redirect or notify via event emitter/context
    }

    // Attach custom message to error object for hooks to use
    error.displayMessage = message;

    return Promise.reject(error);
  },
);

export default axiosInstance;
