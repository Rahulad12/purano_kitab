import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { setStoredUser, setToken } from "../api/auth.service.config.helper";
import { useGetLoggedInUserDetails } from "../api/hooks/user";
import BookLoader from "../components/common/Loader";
import { showError } from "../components/ui/Toast";
import { useAuth } from "../context/AuthContext";

export default function Success() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [tokenReady, setTokenReady] = useState(false);
  const { data: user, isLoading, isError } = useGetLoggedInUserDetails({ enabled: tokenReady });
  const router = useRouter();

  const { setUser, setIsLoggedIn } = useAuth();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) {
      showError("No token received");
      router.replace("/auth/Login");
      return;
    }

    const storeToken = async () => {
      try {
        setStatus("Authenticating...");
        await setToken(token);
        setTokenReady(true);
      } catch (error) {
        console.log("Token storage error:", error);
        showError(`Failed to store token ${error}`);
        router.replace("/");
      }
    };

    storeToken();
  }, [token]);

  useEffect(() => {
    if (user && tokenReady && !isLoading) {
      const completeLogin = async () => {
        try {
          setStatus("Authenticating...");
          await setStoredUser(user);
          setUser(user);
          setIsLoggedIn(true);

          setStatus("Success! Redirecting...");
          console.log("Redirecting to protected area");
          setTimeout(() => {
            router.replace("/protected");
          }, 500);
        } catch (error) {
          console.log("Login error:", error);
          showError(`Failed to complete login ${error}`);
          router.replace("/");
        }
      };

      completeLogin();
    } else if (isError) {
      console.log("Failed to fetch user details");
      showError("Failed to fetch user details");
      router.replace("/auth/Login");
    }
  }, [user, tokenReady, isLoading, isError]);

  return (
    <View style={styles.container}>
      <BookLoader />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf6ec",
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "#9c6b3c",
  },
});
