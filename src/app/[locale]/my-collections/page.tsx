import { cookies } from "next/headers";
import { MyCollectionsClient } from "./MyCollectionsClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/shared/constants/constants";
import { IFolder } from "@/shared/hooks/useFolders";
import { IUser } from "@/features/auth/model/auth.store";
import { jwtDecode } from "jwt-decode";

interface AccessTokenPayload {
  sub: string;
  email: string;
  username: string;
  exp: number;
}

export default async function MyCollectionsPage() {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();

  let validToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let userId = "";

  if (validToken) {
    const payload = jwtDecode<AccessTokenPayload>(validToken);
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired && refreshToken) {
      const { data } = await axios.post<{ accessToken: string }>(
        `${API_URL}/auth/refresh`,
        {},
        {
          headers: { Cookie: `refreshToken=${refreshToken}` },
        },
      );
      validToken = data.accessToken;
    }
  }

  if (validToken) {
    const { data: me } = await axios.get<IUser>(`${API_URL}/auth/me`, {
      headers: { Cookie: `accessToken=${validToken}` },
    });
    userId = me.id ?? "";

    await queryClient.prefetchQuery({
      queryKey: ["folders", userId],

      queryFn: async () => {
        const { data } = await axios.get<IFolder[]>(`${API_URL}/movie-folders`, {
          headers: { Cookie: `accessToken=${validToken}` },
        });
        return data;
      },
    });
  }

  // console.log(userId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyCollectionsClient userId={userId} />
    </HydrationBoundary>
  );
}
