import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
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
    },
  });
};
