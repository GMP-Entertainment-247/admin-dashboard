import { useQuery } from "@tanstack/react-query";
import { createApiClient } from "../api";
import { handleApiError } from "../errorHelpers";

export default function useFetch<T = unknown>(
  url: string,
  params?: Record<string, any>,
  options?: { enabled?: boolean }
) {
  const fetcher = async (): Promise<T> => {
    try {
      const response = await createApiClient().get(url, { params });

      // If API returns 200 OK with { status: false, message: "...", data: null }
      if (response.data?.status === false) {
        throw new Error(
          handleApiError(
            { response: { data: response.data } },
            "Failed to load data"
          )
        );
      }

      return response.data.data;
    } catch (error) {
      // Convert Axios + Laravel validation error into readable text
      const formattedMessage = handleApiError(error, "Failed to load data");

      // Throw a new clean message so React Query exposes a readable error
      throw new Error(formattedMessage);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [url, params],
    queryFn: fetcher,
    staleTime: 300000, // 5 minutes
    // cacheTime: 300000, // 5 minutes
    retry: 3, // retry up to 3 times on error
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true,
  });

  return {
    data,
    loading: isLoading,
    error,
    refetch,
  };
}
