import { BookOpen, Film, Ghost, Heart, Smile, Search, Star, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Folder {
  id: number;
  name: string;
  icon: LucideIcon;
  count: number;
  posters: string[];
  accentColor: string;
  borderBase: string;
  borderActive: string;
  glowColor: string;
  iconColor: string;
  liked: number;
  shared: number;
  isVisible: boolean;
}

export const folders: Folder[] = [
  {
    id: 1,
    name: "Ужасы",
    icon: Ghost,
    count: 24,
    posters: ["/images/mock-movie-6.jpg", "/images/mock-movie-1.jpg", "/images/mock-movie-2.webp"],
    accentColor: "from-red-950/80 to-red-900/20",
    borderBase: "border-red-900/30",
    borderActive: "border-red-500/60",
    glowColor: "shadow-red-900/40",
    iconColor: "text-red-400",
    liked: 10,
    shared: 5,
    isVisible: true,
  },
  {
    id: 2,
    name: "Любимое",
    icon: Heart,
    count: 47,
    posters: ["/images/mock-movie-4.jpg", "/images/mock-movie-5.webp", "/images/mock-movie-7.webp"],
    accentColor: "from-pink-950/80 to-pink-900/20",
    borderBase: "border-pink-900/30",
    borderActive: "border-pink-500/60",
    glowColor: "shadow-pink-900/40",
    iconColor: "text-pink-400",
    liked: 15,
    shared: 8,
    isVisible: true,
  },
  {
    id: 3,
    name: "Детективы",
    icon: Search,
    count: 18,
    posters: [
      "/images/mock-movie-9.webp",
      "/images/mock-movie-3.webp",
      "/images/mock-movie-8.webp",
    ],
    accentColor: "from-amber-950/80 to-amber-900/20",
    borderBase: "border-amber-900/30",
    borderActive: "border-amber-500/60",
    glowColor: "shadow-amber-900/40",
    iconColor: "text-amber-400",
    liked: 20,
    shared: 12,
    isVisible: true,
  },
  {
    id: 4,
    name: "Триллеры",
    icon: Zap,
    count: 31,
    posters: ["/images/mock-movie-2.webp", "/images/mock-movie-6.jpg", "/images/mock-movie-9.webp"],
    accentColor: "from-blue-950/80 to-blue-900/20",
    borderBase: "border-blue-900/30",
    borderActive: "border-blue-500/60",
    glowColor: "shadow-blue-900/40",
    iconColor: "text-blue-400",
    liked: 25,
    shared: 15,
    isVisible: false,
  },
  {
    id: 5,
    name: "Фантастика",
    icon: Star,
    count: 22,
    posters: [
      "/images/mock-movie-10.jpg",
      "/images/mock-movie-3.webp",
      "/images/mock-movie-7.webp",
    ],
    accentColor: "from-purple-950/80 to-purple-900/20",
    borderBase: "border-purple-900/30",
    borderActive: "border-purple-500/60",
    glowColor: "shadow-purple-900/40",
    iconColor: "text-purple-400",
    liked: 30,
    shared: 18,
    isVisible: false,
  },
  {
    id: 6,
    name: "Комедии",
    icon: Smile,
    count: 35,
    posters: ["/images/mock-movie-1.jpg", "/images/mock-movie-4.jpg", "/images/mock-movie-6.jpg"],
    accentColor: "from-yellow-950/80 to-yellow-900/20",
    borderBase: "border-yellow-900/30",
    borderActive: "border-yellow-500/60",
    glowColor: "shadow-yellow-900/40",
    iconColor: "text-yellow-400",
    liked: 35,
    shared: 21,
    isVisible: false,
  },
  {
    id: 7,
    name: "Мультфильмы",
    icon: Film,
    count: 28,
    posters: [
      "/images/mock-movie-2.webp",
      "/images/mock-movie-5.webp",
      "/images/mock-movie-8.webp",
    ],
    accentColor: "from-green-950/80 to-green-900/20",
    borderBase: "border-green-900/30",
    borderActive: "border-green-500/60",
    glowColor: "shadow-green-900/40",
    iconColor: "text-green-400",
    liked: 40,
    shared: 24,
    isVisible: false,
  },
  {
    id: 8,
    name: "Документальные",
    icon: BookOpen,
    count: 14,
    posters: [
      "/images/mock-movie-9.webp",
      "/images/mock-movie-3.webp",
      "/images/mock-movie-10.jpg",
    ],
    accentColor: "from-indigo-950/80 to-indigo-900/20",
    borderBase: "border-indigo-900/30",
    borderActive: "border-indigo-500/60",
    glowColor: "shadow-indigo-900/40",
    iconColor: "text-indigo-400",
    liked: 45,
    shared: 27,
    isVisible: false,
  },
];
