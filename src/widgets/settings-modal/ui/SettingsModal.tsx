"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui";
import { SidebarSettingsModal } from "./SidebarSettingsModal";
import { MenuKey } from "../lib/types";
import { CardSettings, AccountSettings } from "@/widgets";
import { useIsDesktop } from "@/shared/hooks";

interface Props {
  children: ReactNode;
  defaultMenu?: MenuKey;
}

export const SettingsModal = ({ children, defaultMenu = "account" }: Props) => {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(defaultMenu);
  const isDesktop = useIsDesktop();
  const locale = useLocale();

  if (!isDesktop) return <Link href={`/${locale}/settings`}>{children}</Link>;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-full sm:max-w-240 max-w-240 h-170 p-0 gap-0 overflow-hidden bg-background border-border"
        showCloseButton
        aria-describedby={undefined}
      >
        <div className="flex h-full overflow-hidden">
          <SidebarSettingsModal activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

          <main
            className="flex-1 min-w-0 overflow-hidden h-full grid grid-rows-[100%]"
            style={{ gridTemplateColumns: activeMenu === "movie-card" ? "18rem 1fr" : "1fr" }}
          >
            {activeMenu === "account" && <AccountSettings />}
            {activeMenu === "movie-card" && <CardSettings />}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};
