import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api-client";
import { API_URL } from "../constants/constants";

interface IIcon {
  id: string;
  name: string;
  style: "filled" | "outlined";
  svgContent: string;
  tags: string[];
  category: string | null;
}

export const useIcons = () => {
  return useQuery({
    queryKey: ["icons"],
    queryFn: async () => {
      const { data } = await apiClient.get<IIcon[]>(`${API_URL}/icons`);
      return data;
    },
  });
};
