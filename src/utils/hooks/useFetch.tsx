import { useQuery } from "@tanstack/react-query";
import { createApiClient } from "../api";

export default function useFetch<T = unknown>(url: string, params?: Record<string, any>) {
  const fetcher = async (): Promise<T> => {
    const response = await createApiClient().get(url, { params });
    return response.data.data;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [url, params],
    queryFn: fetcher,
    staleTime: 300000, // 5 minutes
    // cacheTime: 300000, // 5 minutes
    retry: 3, // retry up to 3 times on error
    refetchOnWindowFocus: false,
  });

  return {
    data,
    loading: isLoading,
    error,
    refetch,
  };
}