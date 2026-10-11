import { CollectionsClient } from "./CollectionsClient";
import { jwtDecode } from "jwt-decode";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { collectionQueryOptions, collectionMediaQueryOptions } from "@/shared/hooks";
import { profileQueryOptions } from "@/shared/hooks";
import { getAccessToken } from "@/shared/lib/getAccessToken";

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
  const token = await getAccessToken();

  const userId = token ? jwtDecode<{ sub: string }>(token).sub : "";

  const queryClient = new QueryClient();

  const { id } = await params;
  const { collectionId } = await searchParams;

  const isMyCollection = id === userId;

  const [collections] = await Promise.all([
    queryClient.fetchQuery(collectionQueryOptions({ userId: id, isMyCollection, token })),
    queryClient.prefetchQuery(profileQueryOptions({ userId: id, token })),
  ]);

  const firstCollectionId = collectionId ? collectionId : (collections?.[0]?.id ?? "");

  await queryClient.prefetchQuery(
    collectionMediaQueryOptions({
      collectionId: firstCollectionId,
      userId: id,
      token,
      searchQuery: "",
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
