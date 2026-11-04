import {
  queryOptions,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/shared/api/config";
import { apiClient } from "../api/api-client";
import { useAuthStore } from "@/features/auth";
import { type ApiFieldError } from "@/shared/types/api-error-types";

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
  isFollowing: boolean;
  updatedAt: Date;
}

interface ProfileQueryArgs {
  userId: string;
  token?: string;
}

export const profileQueryOptions = ({ userId, token }: ProfileQueryArgs) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<UserProfile>(
        `${API_URL}/profile/${userId}`,
        token ? { headers: { Cookie: `accessToken=${token}` } } : {},
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });

type UpdateProfilePaylod = Partial<{
  nickname: string;
  tag: string;
  bio: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  socialUrls: string[];
}>;

export const isTagTakenError = (error: unknown) => {
  return axios.isAxiosError<ApiFieldError>(error) && error.response?.data.status === "TAG_EXISTS";
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: UpdateProfilePaylod) => {
      const { data } = await apiClient.patch<UserProfile>(`${API_URL}/profile/update`, profileData);
      return data;
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["profile", updatedProfile.userId], updatedProfile);

      const { user, setUser } = useAuthStore.getState();

      setUser({
        ...user,
        nickname: updatedProfile.nickname,
        avatarUrl: updatedProfile.avatarUrl,
      });
    },
  });
};

export const useUpdateProfileCover = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cover: File) => {
      const formData = new FormData();
      formData.append("cover", cover);

      const { data } = await apiClient.patch<UserProfile>(
        `${API_URL}/profile/update-cover`,
        formData,
      );

      return data;
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["profile", updatedProfile.userId], updatedProfile);
    },
  });
};

export const useUpdateProfileAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (avatar: File) => {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const { data } = await apiClient.patch<UserProfile>(
        `${API_URL}/profile/update-avatar`,
        formData,
      );

      return data;
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["profile", updatedProfile.userId], updatedProfile);

      const { user, setUser } = useAuthStore.getState();

      setUser({
        ...user,
        avatarUrl: updatedProfile.avatarUrl,
      });
    },
  });
};

export interface FollowUser {
  userId: string;
  nickname: string;
  tag: string;
  avatarUrl: string | null;
  collectionsCount: number;
  isFollowing: boolean;
  isMe: boolean;
}

export interface FollowsResponse {
  follows: FollowUser[];
  totalPages: number;
  page: number;
  totalResults: number;
}

type FollowsType = "followers" | "following";

interface GetFollowsQueryArgs {
  userId: string;
  type: FollowsType;
  limit: number;
  searchQuery?: string;
}

export const useInfiniteFollows = ({ userId, type, limit, searchQuery }: GetFollowsQueryArgs) => {
  return useInfiniteQuery({
    queryKey: ["follows", userId, type, searchQuery],
    queryFn: async ({ pageParam }) => {
      const { data } = await apiClient.get<FollowsResponse>(
        `${API_URL}/profile/${userId}/follows?type=${type}&limit=${limit}&page=${pageParam}&search=${searchQuery}`,
      );
      return data;
    },

    select: (data) => data.pages.flatMap((page) => page.follows),

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      if (page >= totalPages) return undefined;
      return page + 1;
    },

    initialPageParam: 1,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(userId),
  });
};

export const useFollowProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await apiClient.post<UserProfile>(`${API_URL}/profile/${userId}/follow`);
      return data;
    },

    onSuccess: (_data, followedUserId) => {
      queryClient.setQueriesData(
        { queryKey: ["follows"] },
        (old: InfiniteData<FollowsResponse> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              follows: page.follows.map((user) =>
                user.userId === followedUserId ? { ...user, isFollowing: !user.isFollowing } : user,
              ),
            })),
          };
        },
      );

      void queryClient.invalidateQueries({ queryKey: ["profile", followedUserId] });
    },
  });
};
