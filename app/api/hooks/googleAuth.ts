import { showError, showSuccess } from "@/app/components/ui/Toast";
import { useAuth } from "@/app/context/AuthContext";
import {
  GoogleAuthorizationUrlResponse,
  GoogleOAuthResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
} from "@/app/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import {
  clearStorage,
  setStoredUser,
  setToken,
} from "../auth.service.config.helper";
import axiosInstance from "../axiosInstance";

const REDIRECT_URI =
  process.env.EXPO_PUBLIC_REDIRECT_URI || "puranokitab://auth/success";

/**
 * Get Google OAuth Authorization URL
 */
export const useGetGoogleAuthorizationUrl = () => {
  return useQuery({
    queryKey: ["googleAuthUrl"],
    queryFn: async () => {
      const response = await axiosInstance.get<GoogleAuthorizationUrlResponse>(
        "/auth/google/authorization-url",
      );
      return response.data.data.authorizationUrl;
    },
    staleTime: Infinity,
    enabled: false,
  });
};

/**
 * Handle Google OAuth Callback and Login — fixed: useQuery → useMutation
 */
export const useGoogleOAuthCallback = () => {
  const { setUser, setIsLoggedIn } = useAuth();

  return useMutation({
    mutationFn: async (code: string) => {
      const response = await axiosInstance.post<GoogleOAuthResponse>(
        "/auth/google/callback",
        { code },
      );
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.accessToken && data.user) {
        await setToken(data.accessToken);
        await setStoredUser(data.user);

        if (data.refreshToken) {
          await SecureStore.setItemAsync("refresh_token", data.refreshToken);
        }

        setUser(data.user);
        setIsLoggedIn(true);
        showSuccess(`Welcome ${data.user?.firstName || "User"}!`);
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Google login failed";
      showError(errorMessage);
      console.error("[Google OAuth Error]", error);
    },
  });
};

/**
 * Refresh Token Mutation
 */
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = await SecureStore.getItemAsync("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axiosInstance.post<TokenRefreshResponse>(
        "/auth/refresh",
        { refreshToken } as TokenRefreshRequest,
      );
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.accessToken) {
        await setToken(data.accessToken);
      }
    },
    onError: (error: any) => {
      console.error("[Token Refresh Error]", error);
      clearStorage();
    },
  });
};

/**
 * Handle opening Google OAuth URL in browser
 * Backend redirects to: puranokitab://auth/success?code=xxx
 */
export const useOpenGoogleAuthBrowser = () => {
  return async (authUrl: string) => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        REDIRECT_URI,
      );
      console.log("Browser result:", result);

      if (result.type === "success") {
        console.log("Callback URL:", result.url);
        const url = result.url;

        if (url.includes("auth/error")) {
          const messageMatch = url.match(/[?&]message=([^&]*)/);
          const message = messageMatch
            ? decodeURIComponent(messageMatch[1])
            : "Login failed";

          return { success: false, error: message };
        }

        // Handle puranokitab://auth/success?code=xxx pattern
        const tokenMatch = url.match(/[?&]token=([^&]*)/);
        const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;

        if (token) {
          return { token, success: true };
        } else {
          return { success: false, error: "No authorization token received" };
        }
      } else if (result.type === "cancel") {
        return { success: false, error: "Google login cancelled" };
      }

      return { success: false, error: "Unexpected browser result" };
    } catch (error) {
      console.error("[WebBrowser Error]", error);
      return { success: false, error: String(error) };
    }
  };
};

/**
 * Complete Google Login Flow Hook
 */
export const useGoogleLogin = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const { refetch: refetchAuthUrl } = useGetGoogleAuthorizationUrl();
  const googleCallback = useGoogleOAuthCallback(); // now correctly a mutation
  const openAuthBrowser = useOpenGoogleAuthBrowser();

  const handleGoogleLogin = async () => {
    try {
      // Step 1: Get authorization URL
      const result = await refetchAuthUrl();
      const url = result.data;
      console.log("Authorization URL:", url);
      if (!url) {
        showError("Failed to get Google authorization URL");
        return;
      }

      // Step 2: Open browser for user to authorize
      const browserResult = await openAuthBrowser(url);

      if (!browserResult?.success) {
        showError(browserResult?.error || "Google login failed");
        return;
      }

      // Step 3: Exchange code for tokens — now works correctly
      if (browserResult.token) {
        await setToken(browserResult.token);
        setIsLoggedIn(true);
        // TODO: Fetch user data and set it
      }
    } catch (error) {
      console.error("[Google Login Error]", error);
      showError("An error occurred during Google login");
    }
  };

  return {
    handleGoogleLogin,
    isLoading: googleCallback.isPending,
    isError: googleCallback.isError,
    error: googleCallback.error,
  };
};
