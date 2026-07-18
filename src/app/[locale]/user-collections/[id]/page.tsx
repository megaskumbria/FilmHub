import { HydrationBoundary } from "@tanstack/react-query";
import { UserCollectionsClient } from "./UserCollectionsClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { useUserCollectionMediaQuery, useUserCollectionsQuery } from "@/shared/hooks";

interface Params {
  locale: string;
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function UserCollectionPage({ params }: Props) {
  const { id: userId } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useUserCollectionsQuery(userId));

  const collections = await queryClient.fetchQuery(useUserCollectionsQuery(userId));
  const collectionId = collections?.[0]?.id ?? "";

  console.log(collectionId);

  await queryClient.prefetchQuery(useUserCollectionMediaQuery(collectionId, userId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserCollectionsClient userId={userId} collectionId={collectionId} />
    </HydrationBoundary>
  );
}
