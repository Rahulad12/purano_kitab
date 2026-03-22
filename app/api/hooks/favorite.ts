import {
  BookSaveAsFavoriteResponse,
  GetALLSavedBooksResponse,
} from "@/app/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import axiosInstance from "../client";

export const useSaveBookAsFavorite = () => {
  return useMutation({
    mutationFn: async (bookId: string) => {
      const response: AxiosResponse<BookSaveAsFavoriteResponse> =
        await axiosInstance.post(`/favorite/${bookId}`);
      return response.data;
    },
    onSuccess: (data) => {
      Toast.show({ type: "success", text1: data.message });
    },
    onError: (error) => {
      console.error("Error saving book as favorite:", error);
      Toast.show({
        type: "error",
        text1: error?.message || "Something went wrong",
      });
    },
  });
};
export const useGetFavorite = () => {
  return useQuery({
    queryKey: ["favorite"],
    queryFn: async () => {
      const response: AxiosResponse<GetALLSavedBooksResponse> =
        await axiosInstance.get("/favorite");
      return response.data;
    },
  });
};
