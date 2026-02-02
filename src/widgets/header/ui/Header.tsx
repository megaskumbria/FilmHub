"use client";

// FIXME: нельзя использовать модули, которые находятся на одном уровне
import { UserMenu } from "@/widgets";

import { MovieSearch } from "./MovieSearch";
import Link from "next/link";
import { Button } from "@/shared/ui";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="mx-auto flex h-14 w-full items-center justify-between gap-3 px-4">
        <nav className="flex min-w-0 items-center gap-4">
          <Link href="/" className="shrink-0 text-base font-semibold tracking-tight text-primary">
            FilmHub
          </Link>

          <ul className="hidden items-center gap-1 sm:flex">
            <li>
              <Link
                href="/"
                className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground"
              >
                Главная
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <MovieSearch />

          <Button
            variant="secondary"
            className="hidden sm:inline-flex bg-secondary text-secondary-foreground border-0"
          >
            <span>Мои коллекции</span>
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
