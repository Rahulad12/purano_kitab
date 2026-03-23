import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const setToken = async (token: string) => {
  await SecureStore.setItemAsync("access_token", token);
};

export const setStoredUser = async (user: object) => {
  const value = JSON.stringify(user);
  await AsyncStorage.setItem("user", value);
};

export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync("access_token");
};

export const getStoredUser = async (): Promise<object | null> => {
  const value = await AsyncStorage.getItem("user");
  return value ? JSON.parse(value) : null;
};

export const clearStorage = async () => {
  await SecureStore.deleteItemAsync("access_token");
  await AsyncStorage.removeItem("user");
};

export const logOutUsers = async () => {
  await SecureStore.deleteItemAsync("access_token");
  await AsyncStorage.removeItem("user");
};
