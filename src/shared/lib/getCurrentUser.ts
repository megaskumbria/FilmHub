import axios from "axios";
import { cookies } from "next/headers";
import { API_URL } from "../api/config";
import { type User } from "@/features/auth";

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    const { data } = await axios.get<User>(`${API_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
    });
    return data;
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 401 || !refreshToken) {
      return null;
    }
  }

  try {
    const { data: tokens } = await axios.post<{ accessToken: string }>(
      `${API_URL}/auth/refresh`,
      {},
      { headers: { Cookie: `refreshToken=${refreshToken}` } },
    );

    const { data } = await axios.get<User>(`${API_URL}/auth/me`, {
      headers: { cookie: `accessToken=${tokens.accessToken}; ${cookieHeader}` },
    });
    return data;
  } catch {
    return null;
  }
};
