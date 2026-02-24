import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios";

const fetchCategories = async () => {
  const response = await axiosClient.get(
    `/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c`
  );
  return response.data.data?.categories || [];
};

const fetchItemsByCategory = async (categoryId) => {
  const response = await axiosClient.get(
    `/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${categoryId}`
  );
  return response.data.data?.items?.data || [];
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategoryItems = (categoryId) => {
  return useQuery({
    queryKey: ["items", categoryId],
    queryFn: () => fetchItemsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
};
