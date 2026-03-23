import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { ChangeEmailDto, ChangePasswordDto, User } from "../../types";
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

export const useChangeEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (changeEmailRequest: ChangeEmailDto) => {
      return axiosInstance.post("/users/change-email", changeEmailRequest);
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
