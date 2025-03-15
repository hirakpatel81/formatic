import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

import { ApiResponse } from "../types/ApiResponse";
import { ApiError } from "../types/ApiError";
import { useErrorHandler } from "./useErrorHandler";

function handleApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.isSuccess) {
    throw new ApiError(
      response.message,
      response.statusCode,
      response.statusCode === 401 ? "toast" : "both",
      response.errors || []
    );
  }
  return response.data!;
}

export function useApiQuery<TData, TError = ApiError>(
  key: string | string[],
  queryFunction: () => Promise<ApiResponse<TData>>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey">
) {
  const { handleGlobalError } = useErrorHandler();

  return useQuery<TData, TError>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async (): Promise<TData> => {
      try {
        const response = await queryFunction();
        var apiResponse = handleApiResponse(response);
        return apiResponse;
      } catch (error: any) {
        handleGlobalError(error);
        throw error;
      }
    },
    select: (data: TData) => data,
    ...options,
  });
}

export function useApiMutation<TData, TVariables, TError = ApiError>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
) {
  const { handleGlobalError } = useErrorHandler(); // Centralized error handling

  return useMutation({
    mutationFn: async (variables) => {
      try {
        const response = await mutationFn(variables);
        return handleApiResponse(response);
      } catch (error: any) {
        handleGlobalError(error); // Automatically handle errors
        throw error;
      }
    },
    ...options,
  });
}
