import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "@/shared/constants/constants";
import { apiClient } from "../api/api-client";

export interface UserProfile {
  userId: string;
  nickname: string;
  tag: string;
  bio: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  socialUrls: string[];
  collectionsCount: number;
  filmsCount: number;
  followersCount: number;
  updatedAt: Date;
}

interface ProfileQueryArgs {
  userId: string;
}

export const profileQueryOptions = ({ userId }: ProfileQueryArgs) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<UserProfile>(`${API_URL}/profile/${userId}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
