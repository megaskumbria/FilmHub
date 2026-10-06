"use client";

import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Separator,
  Avatar,
  AvatarFallback,
  Button,
} from "@/shared/ui";
import { UserActions } from "./UserActions";
import { LangToggle } from "@/features";
import { LogOut } from "lucide-react";
import { useLogout } from "@/shared/hooks";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore, type User } from "@/features/auth";
import { getAvatarColor } from "@/shared/lib";

interface Props {
  initialUser: User | null;
}

export const UserMenu = ({ initialUser }: Props) => {
  const t = useTranslations("header.menu");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = useLogout();

  const { user, hasHydrated } = useAuthStore();
  const nickname = hasHydrated ? user.nickname : initialUser?.nickname;
  const userId = hasHydrated ? user.id : initialUser?.id;
  const avatarUrl = hasHydrated ? user.avatarUrl : initialUser?.avatarUrl;
  // const email = hasHydrated ? user.email : initialUser?.email;

  const firstAvatarLetter = nickname?.charAt(0).toUpperCase();

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Avatar
          size="lg"
          className="cursor-pointer border-2 border-border bg-muted/30 transition-[border-color,opacity] duration-200 hover:border-muted-foreground/30 hover:opacity-90"
        >
          {avatarUrl ?
            <img src={avatarUrl} alt="" className="size-full rounded-full object-cover" />
          : <AvatarFallback
              style={{ backgroundColor: getAvatarColor(userId ?? "") }}
              className="bg-secondary text-primary font-medium text-sm"
            >
              {firstAvatarLetter}
            </AvatarFallback>
          }
        </Avatar>
      </PopoverTrigger>

      <PopoverContent
        className="max-w-[320px] flex flex-col gap-2 border-border bg-card text-card-foreground rounded-2xl"
        align="end"
        sideOffset={5}
      >
        <section className="flex flex-col justify-start items-start">
          <div className="text-2xl font-medium text-primary">{nickname}</div>
          {/* <div className="text-sm text-muted">{email}</div> */}
        </section>

        <LangToggle />

        <UserActions />

        <Separator decorative orientation="horizontal" />

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
      </PopoverContent>
    </Popover>
  );
};
