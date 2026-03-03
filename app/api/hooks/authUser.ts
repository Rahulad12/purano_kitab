import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { AuthRequest, AuthResponse } from "../../types";
import axiosInstance from "../client";

export const useAuthUser = () => {
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
    onError: (error) => {
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
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
