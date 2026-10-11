import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../api/config";

interface AccessTokenPayload {
  exp: number;
}

export const getAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return undefined;

  const refreshToken = cookieStore.get("refreshToken")?.value;
  const { exp } = jwtDecode<AccessTokenPayload>(accessToken);
  const isExpired = exp * 1000 < Date.now();

  if (!isExpired || !refreshToken) return accessToken;

  const { data } = await axios.post<{ accessToken: string }>(
    `${API_URL}/auth/refresh`,
    {},
    { headers: { Cookie: `refreshToken=${refreshToken}` } },
  );

  return data.accessToken;
};
