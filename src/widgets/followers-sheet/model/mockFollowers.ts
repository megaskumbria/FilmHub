export interface FollowUser {
  id: number;
  name: string;
  handle: string;
  initials: string;
  color: string;
  collectionsCount: number;
  isFollowing: boolean;
}

export const mockFollowers: FollowUser[] = [
  {
    id: 1,
    name: "Anna Smirnova",
    handle: "@anna_films",
    initials: "AS",
    color: "#e05c8a",
    collectionsCount: 12,
    isFollowing: true,
  },
  {
    id: 2,
    name: "Dmitry Kozlov",
    handle: "@dm_kino",
    initials: "DK",
    color: "#3b82f6",
    collectionsCount: 5,
    isFollowing: false,
  },
  {
    id: 3,
    name: "Maria Petrova",
    handle: "@mary_cinema",
    initials: "MP",
    color: "#10b981",
    collectionsCount: 31,
    isFollowing: true,
  },
  {
    id: 4,
    name: "Alex Volkov",
    handle: "@avolkov",
    initials: "AV",
    color: "#f59e0b",
    collectionsCount: 8,
    isFollowing: false,
  },
  {
    id: 5,
    name: "Kate Novikova",
    handle: "@kate_movies",
    initials: "KN",
    color: "#8b5cf6",
    collectionsCount: 19,
    isFollowing: true,
  },
  {
    id: 6,
    name: "Sergey Morozov",
    handle: "@smoroz",
    initials: "SM",
    color: "#ef4444",
    collectionsCount: 3,
    isFollowing: false,
  },
  {
    id: 7,
    name: "Olga Zakharova",
    handle: "@olga_z",
    initials: "OZ",
    color: "#06b6d4",
    collectionsCount: 24,
    isFollowing: true,
  },
];

export const mockFollowing: FollowUser[] = [
  {
    id: 10,
    name: "Ivan Lebedev",
    handle: "@ivan_cine",
    initials: "IL",
    color: "#9b56f0",
    collectionsCount: 42,
    isFollowing: true,
  },
  {
    id: 11,
    name: "Julia Orlova",
    handle: "@julia_films",
    initials: "JO",
    color: "#f97316",
    collectionsCount: 17,
    isFollowing: true,
  },
  {
    id: 12,
    name: "Nikita Vasilyev",
    handle: "@nvasilev",
    initials: "NV",
    color: "#14b8a6",
    collectionsCount: 9,
    isFollowing: true,
  },
  {
    id: 13,
    name: "Tamara Kuznetsova",
    handle: "@tamara_k",
    initials: "TK",
    color: "#ec4899",
    collectionsCount: 56,
    isFollowing: true,
  },
  {
    id: 14,
    name: "Roman Popov",
    handle: "@rpopov",
    initials: "RP",
    color: "#84cc16",
    collectionsCount: 11,
    isFollowing: true,
  },
];
