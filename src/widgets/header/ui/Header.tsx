"use client";

// FIXME: нельзя использовать модули, которые находятся на одном уровне
import { UserMenu } from "@/widgets";

import Link from "next/link";
import { Button } from "@/shared/ui";
import { SearchMovieDrawer } from "@/widgets";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border px-4 py-4">
      <div className="flex w-full items-center justify-between gap-3">
        <nav className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            className="shrink-0 text-2xl flex items-baseline gap-0.5 font-bold tracking-tight transition-colors hover:opacity-90"
          >
            <span className="text-primary">Film</span>
            <span className="text-accent">Hub</span>
          </Link>

          <Link href="/" className="text-base font-medium text-primary">
            Главная
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <SearchMovieDrawer />

          <Button className="bg-accent hover:bg-accent/80 text-secondary-foreground border-0">
            Мои коллекции
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
