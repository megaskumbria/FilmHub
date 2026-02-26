import { MenuKey } from "../lib/types";
import { ReactNode } from "react";
import { Zap, Film } from "lucide-react";

export const MENU_ITEMS: { key: MenuKey; label: string; icon: ReactNode }[] = [
  { key: "movie-card", label: "Карточка фильма", icon: <Film className="size-4" /> },
  { key: "animations", label: "Анимации", icon: <Zap className="size-4" /> },
];
