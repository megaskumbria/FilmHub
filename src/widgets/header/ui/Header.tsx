"use client";

// FIXME: нельзя использовать модули, которые находятся на одном уровне
import { UserMenu } from "@/widgets/user-menu";

import { MovieSearch } from "./MovieSearch";
import { ThemeToggle, LangToggle } from "@/features";
import Link from "next/link";
import { Button } from "@/shared/ui";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full items-center justify-between gap-3 px-4">
        <nav className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            className="shrink-0 text-base font-semibold tracking-tight text-foreground hover:text-text-accent transition-colors"
          >
            FilmHub
          </Link>

          <ul className="hidden items-center gap-1 sm:flex">
            <li>
              <Link
                href="/"
                className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Главная
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <MovieSearch />

          <Button variant="secondary" className="hidden sm:inline-flex">
            <span>Мои коллекции</span>
          </Button>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <LangToggle />
          </div>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
