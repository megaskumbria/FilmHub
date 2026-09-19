import { queryOptions, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { API_URL } from "@/shared/constants/constants";
import { apiClient } from "../api/api-client";
import { useAuthStore } from "@/features/auth";

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
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

type UpdateProfilePaylod = Partial<{
  nickname: string;
  tag: string;
  bio: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  socialUrls: string[];
}>;

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

type FollowsType = "followers" | "following";

interface GetFollowsQueryArgs {
  userId: string;
  type: FollowsType;
  searchQuery?: string;
}

export const useGetFollows = ({ userId, type, searchQuery }: GetFollowsQueryArgs) => {
  return useQuery({
    queryKey: ["follows", userId, type, searchQuery],
    queryFn: async () => {
      const { data } = await apiClient.get<FollowUser[]>(
        `${API_URL}/profile/${userId}/follows?type=${type}&search=${searchQuery}`,
      );
      return data;
    },
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
      void queryClient.invalidateQueries({ queryKey: ["profile", followedUserId] });
      void queryClient.invalidateQueries({ queryKey: ["follows"] });
    },
  });
};
