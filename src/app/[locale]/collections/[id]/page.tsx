import { cookies } from "next/headers";
import { CollectionsClient } from "./CollectionsClient";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL } from "@/shared/constants/constants";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { collectionQueryOptions, collectionMediaQueryOptions } from "@/shared/hooks";

interface AccessTokenPayload {
  sub: string;
  email: string;
  username: string;
  exp: number;
}

interface SearchParams {
  collectionId: string;
}

interface Params {
  locale: string;
  id: string;
}

interface Props {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

export default async function MyCollectionsPage({ params, searchParams }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const userId = token ? jwtDecode<{ sub: string }>(token).sub : "";

  let validToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

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

  const queryClient = new QueryClient();

  const { id } = await params;
  const { collectionId } = await searchParams;

  const isMyCollection = id === userId;

  const collections = await queryClient.fetchQuery(
    collectionQueryOptions({ userId: id, isMyCollection, token: validToken }),
  );

  const firstCollectionId = collectionId ? collectionId : (collections?.[0]?.id ?? "");

  await queryClient.prefetchQuery(
    collectionMediaQueryOptions({
      collectionId: firstCollectionId,
      userId: id,
      isMyCollection,
      token: validToken,
    }),
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CollectionsClient
        userId={id}
        isMyCollection={isMyCollection}
        collectionId={firstCollectionId}
      />
    </HydrationBoundary>
  );
}
