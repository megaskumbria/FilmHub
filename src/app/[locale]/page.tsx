"use client";

import { mockMovies, type MovieCardData } from "@/shared/model/movies";
import { FilterPopover, BestCollectionsSlider } from "@/widgets";
import { CollectionDeck } from "@/entities";
import { useCollectionsFeed } from "@/shared/hooks/useCollectionsFeed";

interface CollectionUserAvatar {
  id: number;
  name: string;
  initials: string;
  color: string;
  imageUrl?: string;
}

const MOCK_USER_AVATARS: CollectionUserAvatar[] = [
  { id: 1, name: "Anna Smirnova", initials: "AS", color: "#e05c8a" },
  { id: 2, name: "Dmitry Kozlov", initials: "DK", color: "#3b82f6" },
  { id: 3, name: "Maria Petrova", initials: "MP", color: "#10b981" },
  { id: 4, name: "Alex Volkov", initials: "AV", color: "#f59e0b" },
  { id: 5, name: "Kate Novikova", initials: "KN", color: "#8b5cf6" },
  { id: 6, name: "Sergey Morozov", initials: "SM", color: "#ef4444" },
  {
    id: 7,
    name: "Olga",
    initials: "OZ",
    color: "#06b6d4",
    imageUrl: "/images/mock-avatar-actor.webp",
  },
];

export interface CollectionCardData {
  id: number;
  label: string;
  genres: string[];
  rating: number;
  views: string;
  likes: number;
  movies: MovieCardData[];
  owner: CollectionUserAvatar;
}

export const BEST_COLLECTIONS: CollectionCardData[] = [
  {
    id: 1,
    label: "Nightmares",
    genres: ["horror", "thriller"],
    rating: 7.1,
    views: "18.2K",
    likes: 934,
    movies: [mockMovies[0], mockMovies[2], mockMovies[7]],
    owner: MOCK_USER_AVATARS[0],
  },
  {
    id: 2,
    label: "Age of adventure",
    genres: ["fantasy", "action"],
    rating: 8.0,
    views: "41.5K",
    likes: 2300,
    movies: [mockMovies[1], mockMovies[4], mockMovies[6]],
    owner: MOCK_USER_AVATARS[1],
  },
  {
    id: 3,
    label: "Man and war",
    genres: ["drama", "mystery"],
    rating: 8.1,
    views: "27.8K",
    likes: 1540,
    movies: [mockMovies[3], mockMovies[5], mockMovies[7]],
    owner: MOCK_USER_AVATARS[2],
  },
  {
    id: 4,
    label: "Great love",
    genres: ["melodrama", "drama"],
    rating: 7.9,
    views: "55.0K",
    likes: 4100,
    movies: [mockMovies[5], mockMovies[3], mockMovies[4]],
    owner: MOCK_USER_AVATARS[3],
  },
  {
    id: 5,
    label: "Marvel and co.",
    genres: ["sci-fi", "action"],
    rating: 8.4,
    views: "98.3K",
    likes: 7200,
    movies: [mockMovies[6], mockMovies[0], mockMovies[1]],
    owner: MOCK_USER_AVATARS[4],
  },
  {
    id: 6,
    label: "Dark stories",
    genres: ["thriller", "horror"],
    rating: 7.4,
    views: "14.1K",
    likes: 620,
    movies: [mockMovies[2], mockMovies[0], mockMovies[7]],
    owner: MOCK_USER_AVATARS[5],
  },
  {
    id: 7,
    label: "Cult cinema",
    genres: ["adventure", "drama"],
    rating: 8.3,
    views: "36.7K",
    likes: 2890,
    movies: [mockMovies[1], mockMovies[5], mockMovies[3]],
    owner: MOCK_USER_AVATARS[6],
  },
  {
    id: 8,
    label: "Best of the decade",
    genres: ["fantasy", "sci-fi"],
    rating: 8.5,
    views: "72.4K",
    likes: 5610,
    movies: [mockMovies[4], mockMovies[6], mockMovies[1]],
    owner: MOCK_USER_AVATARS[0],
  },
];

export default function Home() {
  const { data: collectionsFeed } = useCollectionsFeed();

  console.log(collectionsFeed);

  return (
    <main className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <BestCollectionsSlider />

      <section className="flex items-center justify-between mb-8 bg-surface rounded-lg p-4 border border-border">
        <span className="text-base font-semibold text-primary">
          Collections: <span className="text-lg">121</span>
        </span>

        <FilterPopover />
      </section>

      <div className="grid grid-cols-5 gap-x-4 gap-y-12 justify-items-center">
        {BEST_COLLECTIONS.map((collection) => (
          <CollectionDeck key={collection.id} collection={collection} />
        ))}
      </div>
    </main>
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
