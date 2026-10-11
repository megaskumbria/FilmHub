import { collectionsFeedQuery } from "@/shared/hooks";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HomeClient } from "./HomeClient";
import { getAccessToken } from "@/shared/lib/getAccessToken";

export default async function Home() {
  const token = await getAccessToken();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(collectionsFeedQuery({ token }));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient />
    </HydrationBoundary>
  );
}
