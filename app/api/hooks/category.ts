import { CategoryResponse } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<CategoryResponse[]> =
        await axiosInstance.get("/categories");
      return response.data;
    },
  });
};
