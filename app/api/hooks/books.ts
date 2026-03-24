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

export interface GetBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  author?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const useGetBooks = (params?: GetBooksParams) => {
  const {
    page = 1,
    limit = 10,
    search,
    author,
    minPrice,
    maxPrice,
  } = params || {};

  return useQuery({
    queryKey: ["books", { page, limit, search, author, minPrice, maxPrice }],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", String(page));
      queryParams.append("limit", String(limit));
      if (search) queryParams.append("search", search);
      if (author) queryParams.append("author", author);
      if (minPrice !== undefined)
        queryParams.append("minPrice", String(minPrice));
      if (maxPrice !== undefined)
        queryParams.append("maxPrice", String(maxPrice));

      const response = await axiosInstance.get(
        `/books?${queryParams.toString()}`,
      );
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
