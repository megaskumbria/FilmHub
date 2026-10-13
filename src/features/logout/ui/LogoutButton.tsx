"use client";

import { Button } from "@/shared/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "../lib/useLogout";
import { useTranslations } from "next-intl";

export const LogoutButton = () => {
  const t = useTranslations("header.menu");

  const handleLogout = useLogout();

  return (
    <Button
      size="sm"
      className="flex items-center group px-1 h-10 w-full justify-start gap-3 rounded-xl text-destructive transition-colors hover:bg-destructive/10"
      onClick={() => void handleLogout()}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/15 text-destructive/80 transition-colors ">
        <LogOut size={16} strokeWidth={2} />
      </span>
      <span className="flex-1 text-left">{t("logout")}</span>
    </Button>
  );
};
