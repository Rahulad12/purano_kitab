import { useAuth } from "@/app/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { AuthRequest, AuthResponse } from "../../types";
import {
  clearStorage,
  setStoredUser,
  setToken,
} from "../auth.service.config.helper";
import axiosInstance from "../axiosInstance";

export const useAuthUser = () => {
  const { setUser, setIsLoggedIn } = useAuth();

  return useMutation({
    mutationFn: async (credentials: AuthRequest) => {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        credentials,
      );
      await setToken(response.data.accessToken);
      return response.data?.user;
    },
    onSuccess: async (data) => {
      if (data) {
        await setStoredUser(data);
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

// ─── Register ──────────────────────────────────────────────────────────────────

export const useRegister = () => {
  return useMutation({
    mutationFn: async (
      credentials: AuthRequest & { firstName?: string; lastName?: string },
    ) => {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/register",
        credentials,
      );
      await setToken(response.data.accessToken);
      return response.data;
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
  });
};

// ─── Logout ────────────────────────────────────────────────────────────────────

export const logout = async () => {
  try {
    await clearStorage();
  } catch (error) {
    console.error("Logout error:", error);
  }
};
