"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Separator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "@/shared/ui";
import { UserActions } from "./UserActions";
import { LangToggle } from "@/features";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/features/auth/model/auth.store";

export const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const { username, email } = user;

  // console.log(user);

  const firstAvatarLetter = username?.charAt(0).toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar
          size="lg"
          className="cursor-pointer border-2 border-border bg-muted/30 transition-[border-color,opacity] duration-200 hover:border-muted-foreground/30 hover:opacity-90"
        >
          <AvatarImage alt="Avatar" className="object-cover" />
          <AvatarFallback className="bg-secondary text-primary font-medium text-sm">
            {firstAvatarLetter}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent
        className="max-w-[320px] flex flex-col gap-2 border-border bg-card text-card-foreground rounded-2xl"
        align="end"
        sideOffset={5}
      >
        <section className="flex flex-col justify-start items-start">
          <div className="text-2xl font-medium text-primary">{username}</div>
          <div className="text-sm text-muted">{email}</div>
        </section>

        <LangToggle />

        <UserActions />

        <Separator decorative orientation="horizontal" />

        <Button
          size="sm"
          className="flex items-center group px-1 h-10 w-full justify-start gap-3 rounded-xl text-destructive transition-colors hover:bg-destructive/10"
          onClick={logout}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/15 text-destructive/80 transition-colors ">
            <LogOut size={16} strokeWidth={2} />
          </span>
          <span className="flex-1 text-left">Log out</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
