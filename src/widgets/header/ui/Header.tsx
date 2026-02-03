"use client";

// FIXME: нельзя использовать модули, которые находятся на одном уровне
import { UserMenu } from "@/widgets";

import Link from "next/link";
import { Button } from "@/shared/ui";
import { Search } from "lucide-react";

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
          <Button
            variant="outline"
            className="size-9 border-border/80 bg-secondary/50 text-muted-foreground hover:border-accent/40 hover:bg-accent/10 transition-colors"
          >
            <Search className="size-4 text-primary" />
          </Button>

          <Button className="bg-accent hover:bg-accent/80 text-secondary-foreground border-0">
            Мои коллекции
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
