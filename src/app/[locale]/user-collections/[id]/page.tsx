import { HydrationBoundary } from "@tanstack/react-query";
import { UserCollectionsClient } from "./UserCollectionsClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { useUserCollectionMediaQuery, useUserCollectionsQuery } from "@/shared/hooks";

interface Params {
  locale: string;
  id: string;
}

interface SearchParams {
  collectionId: string;
}

interface Props {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

export default async function UserCollectionPage({ params, searchParams }: Props) {
  const { id: userId } = await params;
  const { collectionId } = await searchParams;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useUserCollectionsQuery(userId));

  await queryClient.prefetchQuery(useUserCollectionMediaQuery(collectionId, userId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserCollectionsClient userId={userId} collectionId={collectionId} />
    </HydrationBoundary>
  );
}
