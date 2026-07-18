import { collectionsFeedQuery } from "@/shared/hooks";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HomeClient } from "./HomeClient";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(collectionsFeedQuery);

  const dehydratedState = dehydrate(queryClient);
  console.log(dehydratedState);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient />
    </HydrationBoundary>
  );
}

// type CatalogLayoutPreview = "grid" | "list";

// const CatalogLayoutSwitch = () => {
//   const [layout, setLayout] = useState<CatalogLayoutPreview>("grid");

//   return (
//     <div
//       className="flex rounded-md border border-border bg-graphite p-0.5 shadow-inner"
//       role="group"
//       aria-label="Collection layout"
//     >
//       <Button
//         type="button"
//         variant="transparent"
//         size="none"
//         onClick={() => setLayout("grid")}
//         className={cn(
//           "relative flex h-8 w-10 items-center justify-center rounded-sm transition-[color,box-shadow,background-color]",
//           layout === "grid" && "bg-surface text-accent shadow-sm ring-1 ring-border",
//           layout !== "grid" && "text-zinc-muted hover:bg-surface/50 hover:text-primary",
//         )}
//         aria-pressed={layout === "grid"}
//       >
//         <LayoutGrid className="size-4" aria-hidden />
//       </Button>
//       <Button
//         type="button"
//         variant="transparent"
//         size="none"
//         onClick={() => setLayout("list")}
//         className={cn(
//           "relative flex h-8 w-10 items-center justify-center rounded-sm transition-[color,box-shadow,background-color]",
//           layout === "list" && "bg-surface text-accent shadow-sm ring-1 ring-border",
//           layout !== "list" && "text-zinc-muted hover:bg-surface/50 hover:text-primary",
//         )}
//         aria-pressed={layout === "list"}
//       >
//         <LayoutList className="size-4" aria-hidden />
//       </Button>
//     </div>
//   );
// };
