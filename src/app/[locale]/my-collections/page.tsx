import { cookies } from "next/headers";
import { MyCollectionsClient } from "./MyCollectionsClient";
// import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { API_URL } from "@/shared/constants/constants";
// import { Collection } from "@/shared/hooks/useCollection";
// import { User } from "@/features/auth/model/auth.store";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL } from "@/shared/constants/constants";
import { Collection } from "@/shared/hooks/useCollection";
// import { Media } from "@/shared/stores/movie-catalog";

interface AccessTokenPayload {
  sub: string;
  email: string;
  username: string;
  exp: number;
}

export default async function MyCollectionsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const userId = token ? jwtDecode<{ sub: string }>(token).sub : "";

  let validToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let collectionsData = [];

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
    const collectionsRes = await axios.get<Collection[]>(`${API_URL}/collection`, {
      headers: { Cookie: `accessToken=${validToken}` },
    });

    collectionsData = collectionsRes.data;
    // console.log("collectionsData", collectionsData);
  }

  // console.log("collectionsData", collectionsData.length);
  const hasCollections = collectionsData.length > 0;

  return <MyCollectionsClient userId={userId} hasCollections={hasCollections} />;

  // let userId = "";

  // if (validToken) {
  //   const { data: me } = await axios.get<User>(`${API_URL}/auth/me`, {
  //     headers: { Cookie: `accessToken=${validToken}` },
  //   });
  //   userId = me.id ?? "";

  //   await queryClient.prefetchQuery({
  //     queryKey: ["collection", userId],

  //     queryFn: async () => {
  //       const { data } = await axios.get<Collection[]>(`${API_URL}/collection`, {
  //         headers: { Cookie: `accessToken=${validToken}` },
  //       });
  //       return data;
  //     },
  //   });

  //   const collections = queryClient.getQueryData<Collection[]>(["collection", userId]);
  //   const firstCollectionId = collections?.[0]?.id;

  //   if (firstCollectionId) {
  //     await queryClient.prefetchQuery({
  //       queryKey: ["media-collection", firstCollectionId],
  //       queryFn: async () => {
  //         const { data } = await axios.get<Media[]>(
  //           `${API_URL}/collection/items/${firstCollectionId}`,
  //           { headers: { Cookie: `accessToken=${validToken}` } },
  //         );
  //         return data;
  //       },
  //     });
  //   }
  // }

  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <MyCollectionsClient userId={userId} />
  //   </HydrationBoundary>
  // );
}
