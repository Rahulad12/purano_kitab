import {
  BookByUserResponseType,
  BookDetails,
  CreateBookInformation,
  CreateBookResponse,
} from "@/app/types";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import axiosInstance from "../axiosInstance";

export const useGetBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axiosInstance.get("/books");
      return response.data;
    },
  });
};

export const useGetBookById = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const response: AxiosResponse<BookDetails> = await axiosInstance.get(
        `/books/${id}`,
      );
      return response.data;
    },
  });
};

export const useGetBookByUser = () => {
  return useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const response: AxiosResponse<BookByUserResponseType> =
        await axiosInstance.get(`/books/user`);
      return response.data;
    },
  });
};
export const useCreateBooks = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: async (value: CreateBookInformation) => {
      const response: AxiosResponse<CreateBookResponse> =
        await axiosInstance.post("/books", value);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      Toast.show({ type: "success", text1: data.message });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  });
};
