import { useAuth } from "@/app/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { AuthRequest, AuthResponse } from "../../types";
import axiosInstance from "../client";

export const useAuthUser = () => {
  const { setUser, setIsLoggedIn } = useAuth();
  return useMutation({
    mutationFn: async (credentials: AuthRequest) => {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        credentials,
      );
      if (Platform.OS === "web") {
        localStorage.setItem("access_token", response.data.accessToken);
      } else {
        await SecureStore.setItemAsync(
          "access_token",
          response.data?.accessToken,
        );
      }
      return response.data?.user;
    },
    onSuccess: async (data) => {
      if (data) {
        if (Platform.OS === "web") {
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          await AsyncStorage.setItem("user", JSON.stringify(data));
        }
        setUser(data);
        setIsLoggedIn(true);
        Toast.show({ type: "success", text1: "Login successful" });
      }
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error?.message || "Unknown error",
      });
      console.error("Login error:", error);
    },
  });
};

// Register mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: async (
      credentials: AuthRequest & { firstName?: string; lastName?: string },
    ) => {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/register",
        credentials,
      );

      if (Platform.OS === "web") {
        localStorage.setItem("access_token", response.data.accessToken);
      } else {
        await SecureStore.setItemAsync(
          "access_token",
          response.data.accessToken,
        );
      }
      return response.data;
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
  });
};

// Logout function
export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
