import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/AuthContext';
export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
      <Toast />
    </AuthProvider>
  );
}