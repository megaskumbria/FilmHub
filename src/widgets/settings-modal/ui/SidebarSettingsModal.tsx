"use client";

import { useTranslations } from "next-intl";
import { Button, Separator, DialogHeader, DialogTitle } from "@/shared/ui";
import { type MenuKey } from "../lib/types";
import { MENU_ITEMS } from "../model/menu-items";
import { cn } from "@/shared/lib/utils";

interface Props {
  activeMenu: MenuKey;
  setActiveMenu: (menu: MenuKey) => void;
}

export const SidebarSettingsModal = ({ activeMenu, setActiveMenu }: Props) => {
  const t = useTranslations("settings");

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-border bg-surface-subtle">
      <DialogHeader className="px-5 pt-5 pb-4">
        <DialogTitle className="text-xs font-semibold text-zinc-muted tracking-widest uppercase">
          {t("title")}
        </DialogTitle>
      </DialogHeader>

      <Separator />

      <nav className="flex flex-col gap-1 p-3">
        {MENU_ITEMS.map(({ key, icon }) => (
          <Button
            key={key}
            onClick={() => setActiveMenu(key)}
            className={cn(
              "relative flex items-center justify-start gap-3 w-full px-3 py-2.5 rounded-lg transition-colors overflow-hidden",
              activeMenu === key ?
                "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/10"
              : "text-zinc-muted hover:bg-border/50 hover:text-zinc-light border border-transparent",
            )}
          >
            {activeMenu === key && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
            )}
            {icon} <span className="text-sm font-medium">{t(`tabs.${key}`)}</span>
          </Button>
        ))}
      </nav>
    </aside>
  );
};
