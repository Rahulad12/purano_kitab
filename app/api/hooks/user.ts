import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { ChangeEmailOrPhoneDto, ChangePasswordDto, User } from "../../types";
import axiosInstance from "../axiosInstance";

export const useGetLoggedInUserDetails = () => {
  return useQuery({
    queryKey: ["loggedInUserDetails"],
    queryFn: async () => {
      const response: AxiosResponse<User> =
        await axiosInstance.get("/users/me");
      return response.data;
    },
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (changePasswordRequest: ChangePasswordDto) => {
      return axiosInstance.post(
        "/users/change-password",
        changePasswordRequest,
      );
    },
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: data.data.message,
      });
    },
    onError: (error: any) => {
      console.log("Error changing password", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Error changing password",
      });
    },
  });
};

export const useChangeEmailOrPhone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (changeEmailOrPhoneRequest: ChangeEmailOrPhoneDto) => {
      return axiosInstance.post(
        "/users/change-email-or-phone",
        changeEmailOrPhoneRequest,
      );
    },
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: data.data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["loggedInUserDetails"] });
    },
    onError: (error: any) => {
      console.log("Error changing email", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Error changing email",
      });
      queryClient.invalidateQueries({ queryKey: ["loggedInUserDetails"] });
    },
  });
};
