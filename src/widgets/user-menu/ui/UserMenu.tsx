"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Separator,
  Avatar,
  AvatarFallback,
} from "@/shared/ui";
import { UserActions } from "./UserActions";
import { LangToggle, LogoutButton } from "@/features";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore, type User } from "@/features/auth";
import { getAvatarColor } from "@/shared/lib";

interface Props {
  initialUser: User | null;
}

export const UserMenu = ({ initialUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { user, hasHydrated } = useAuthStore();
  const nickname = hasHydrated ? user.nickname : initialUser?.nickname;
  const userId = hasHydrated ? user.id : initialUser?.id;
  const avatarUrl = hasHydrated ? user.avatarUrl : initialUser?.avatarUrl;

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
        </section>

        <LangToggle />

        <UserActions />

        {/* <SupportProject /> */}

        <Separator decorative orientation="horizontal" />

        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
};
