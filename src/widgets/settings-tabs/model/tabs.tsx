import { ReactNode } from "react";
import { Film, UserCog } from "lucide-react";

export type SettingsTab = "account" | "movie-card";

interface Tab {
  tabKey: SettingsTab;
  label: string;
  icon: ReactNode;
}

export const SETTINGS_TABS: Tab[] = [
  { tabKey: "account", label: "Account", icon: <UserCog className="size-4" /> },
  { tabKey: "movie-card", label: "Movie card", icon: <Film className="size-4" /> },
];
