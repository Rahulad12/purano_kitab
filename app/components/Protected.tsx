import { Redirect } from "expo-router";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Redirect href="/" />;
  }
  return <>{children}</>;
};

export default Protected;
