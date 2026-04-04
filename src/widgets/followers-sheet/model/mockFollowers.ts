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
    name: "Анна Смирнова",
    handle: "@anna_films",
    initials: "АС",
    color: "#e05c8a",
    collectionsCount: 12,
    isFollowing: true,
  },
  {
    id: 2,
    name: "Дмитрий Козлов",
    handle: "@dm_kino",
    initials: "ДК",
    color: "#3b82f6",
    collectionsCount: 5,
    isFollowing: false,
  },
  {
    id: 3,
    name: "Мария Петрова",
    handle: "@mary_cinema",
    initials: "МП",
    color: "#10b981",
    collectionsCount: 31,
    isFollowing: true,
  },
  {
    id: 4,
    name: "Алексей Волков",
    handle: "@avolkov",
    initials: "АВ",
    color: "#f59e0b",
    collectionsCount: 8,
    isFollowing: false,
  },
  {
    id: 5,
    name: "Екатерина Новикова",
    handle: "@kate_movies",
    initials: "ЕН",
    color: "#8b5cf6",
    collectionsCount: 19,
    isFollowing: true,
  },
  {
    id: 6,
    name: "Сергей Морозов",
    handle: "@smoroz",
    initials: "СМ",
    color: "#ef4444",
    collectionsCount: 3,
    isFollowing: false,
  },
  {
    id: 7,
    name: "Ольга Захарова",
    handle: "@olga_z",
    initials: "ОЗ",
    color: "#06b6d4",
    collectionsCount: 24,
    isFollowing: true,
  },
];

export const mockFollowing: FollowUser[] = [
  {
    id: 10,
    name: "Иван Лебедев",
    handle: "@ivan_cine",
    initials: "ИЛ",
    color: "#9b56f0",
    collectionsCount: 42,
    isFollowing: true,
  },
  {
    id: 11,
    name: "Юлия Орлова",
    handle: "@julia_films",
    initials: "ЮО",
    color: "#f97316",
    collectionsCount: 17,
    isFollowing: true,
  },
  {
    id: 12,
    name: "Никита Васильев",
    handle: "@nvasilev",
    initials: "НВ",
    color: "#14b8a6",
    collectionsCount: 9,
    isFollowing: true,
  },
  {
    id: 13,
    name: "Тамара Кузнецова",
    handle: "@tamara_k",
    initials: "ТК",
    color: "#ec4899",
    collectionsCount: 56,
    isFollowing: true,
  },
  {
    id: 14,
    name: "Роман Попов",
    handle: "@rpopov",
    initials: "РП",
    color: "#84cc16",
    collectionsCount: 11,
    isFollowing: true,
  },
];
