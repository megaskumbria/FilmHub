import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../constants/constants";

interface AddMediaFlagsArgs {
  mediaId: number;
  flagId: number;
}

export const useAddMediaFlags = () => {
  return useMutation({
    mutationFn: ({ mediaId, flagId }: AddMediaFlagsArgs) => {
      return apiClient.post(`${API_URL}/media-flags/add`, { mediaId, flagId });
    },
  });
};
