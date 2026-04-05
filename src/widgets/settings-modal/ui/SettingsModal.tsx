"use client";

import { useState, ReactNode } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui";
import { SidebarSettingsModal } from "./SidebarSettingsModal";
import { MenuKey } from "../lib/types";
import { CardSettings } from "@/widgets/movie-card-settings";
import { AccountSettings } from "@/widgets/account-settings";

interface Props {
  children: ReactNode;
}

export const SettingsModal = ({ children }: Props) => {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("account");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-full max-w-[960px] sm:max-w-[960px] h-[680px] p-0 gap-0 overflow-hidden bg-background border-border"
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
