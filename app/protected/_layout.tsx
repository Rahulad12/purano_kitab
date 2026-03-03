// app/_layout.tsx
import { Redirect, Slot } from "expo-router";
import Protected from "../components/Protected";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";
export default function RootLayout() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Redirect href="/" />;
  return (
    <Protected>
      <Layout>
        <Slot />
      </Layout>
    </Protected>
  );
}
