// app/_layout.tsx
import { Redirect, Slot } from "expo-router";
import BookLoader from "../components/common/Loader";
import Protected from "../components/Protected";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";
const ProtectedLayout = () => {
  const { isLoggedIn, isloading } = useAuth();
  if (isloading) return <BookLoader />;
  if (!isLoggedIn) return <Redirect href="/" />;
  return (
    <Protected>
      <Layout>
        <Slot />
      </Layout>
    </Protected>
  );
};

export default ProtectedLayout;
