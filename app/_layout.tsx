import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { createQueryClient } from "./api/queryClient";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = createQueryClient();

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
          <Toast position="bottom" />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
