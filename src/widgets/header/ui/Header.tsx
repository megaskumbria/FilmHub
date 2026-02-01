"use client";

// FIXME: нельзя использовать модули, которые находятся на одном уровне
import { UserMenu } from "@/widgets/user-menu";

import { MovieSearch } from "./MovieSearch";
// import { ThemeSwitcher } from "@/features/theme";
import { LangToggler } from "./LangToggler";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="p-3 flex gap-3 w-full border-b-primary border-b">
      <Logo />

      <div className="flex justify-end w-full gap-1.5">
        <MovieSearch />
        <div className="flex gap-2">
          <div className="flex gap-1">
            {/* <ThemeSwitcher /> */}
            <LangToggler />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
