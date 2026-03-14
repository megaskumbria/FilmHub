import { Ghost, Heart, Search } from "lucide-react";
import { Zap } from "lucide-react";
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
  },
];
