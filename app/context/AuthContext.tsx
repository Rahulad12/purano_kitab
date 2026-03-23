import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
  isloading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        const userData = await AsyncStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;

        if (token && user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }

        setIsloading(false);
      } catch (error) {
        console.error("Failed to load token:", error);
        setIsloading(false);
        setUser(null);
      }
    };

    loadToken();
  }, []);

  const login = async (token: string, userData: User) => {
    await SecureStore.setItemAsync("access_token", token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        logout,
        isloading,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
