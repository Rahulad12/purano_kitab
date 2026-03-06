import { BookDetails } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosInstance from "../client";

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
