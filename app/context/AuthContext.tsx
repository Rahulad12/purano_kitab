import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
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
        let token: string | null = null;
        let user: User | null = null;
        if (Platform.OS === "web") {
          token = localStorage.getItem("access_token");
          user = JSON.parse(localStorage.getItem("user") as string);
        } else {
          token = await SecureStore.getItemAsync("access_token");
          user = JSON.parse((await AsyncStorage.getItem("user")) as string);
        }

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
    if (Platform.OS === "web") {
      localStorage.setItem("access_token", token);
    } else {
      await SecureStore.setItemAsync("access_token", token);
    }

    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("access_token");
    } else {
      await SecureStore.deleteItemAsync("access_token");
    }

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
