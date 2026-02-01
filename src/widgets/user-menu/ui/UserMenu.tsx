"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Separator,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/ui";
import { UserActions } from "./UserActions";
import { ThemeToggle, LangToggle } from "@/features";

export const UserMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="ring-2 ring-[#2C2C2C]">
          <AvatarImage src="frontend_chan_170.png" alt="Profile Avatar" />
          <AvatarFallback className="bg-[#2C2C2C] text-[#e5e5e5]">FC</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent
        className="flex flex-col gap-2 border-[#2C2C2C] bg-[#282828] text-[#e5e5e5] shadow-none"
        align="end"
        sideOffset={5}
      >
        <section className="flex flex-col justify-start items-start">
          <div className="text-2xl font-medium">Arnold</div>
          <div className="text-sm text-[#a3a3a3]">callme@tonight.uwu</div>
        </section>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LangToggle />
        </div>

        <Separator decorative orientation="horizontal" className="bg-[#2C2C2C]" />
        <UserActions />
        <Separator decorative orientation="horizontal" className="bg-[#2C2C2C]" />
      </PopoverContent>
    </Popover>
  );
};
