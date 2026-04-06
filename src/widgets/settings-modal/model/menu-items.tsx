import { MenuKey } from "../lib/types";
import { ReactNode } from "react";
import { Film, UserCog } from "lucide-react";

export const MENU_ITEMS: { key: MenuKey; label: string; icon: ReactNode }[] = [
  { key: "account", label: "Account", icon: <UserCog className="size-4" /> },
  { key: "movie-card", label: "Movie card", icon: <Film className="size-4" /> },
  // { key: "animations", label: "Animations", icon: <Wand2 className="size-4" /> },
];
