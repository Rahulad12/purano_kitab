import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { logout } from "./hooks";

const nodeEnv = process.env.NODE_ENV;
const API_URL =
  nodeEnv === "development"
    ? process.env.EXPO_PUBLIC_API_URL_DEV
    : process.env.EXPO_PUBLIC_API_URL_PROD;
console.log("API_URL", API_URL);
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
      let token = "";
      if (Platform.OS === "web") {
        token = localStorage.getItem("access_token") as string;
      } else {
        token = (await SecureStore.getItemAsync("access_token")) as string;
      }
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
    // const { logout: authLogout } = useAuth();
    if (error.response?.status === 401) {
      logout();
      // authLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
