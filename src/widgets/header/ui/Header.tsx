"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/shared/ui";
import { SearchMovieDrawer, AuthModal, UserMenu } from "@/widgets";
import { cn } from "@/shared/lib/utils";
import { useAuthStore } from "@/features/auth/model/auth.store";
// import { LogoSvg } from "@/shared/assets/LogoSvg";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const { user } = useAuthStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-1000 w-full px-10 py-3 transition-colors duration-300",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:transition-colors after:duration-300",
        scrolled ?
          "bg-background/95 after:bg-border/40"
        : "bg-linear-to-b from-black/75 via-black/20 to-transparent after:bg-transparent",
      )}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <nav className="flex min-w-0 items-center gap-6">
          <Link
            href="/"
            className="shrink-0 flex items-baseline gap-0 font-black text-xl tracking-tight hover:opacity-85 transition-opacity"
          >
            <span className="text-primary">Film</span>
            <span className="text-accent">Hub</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>

          <Link
            href="/movie-search"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Movies
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <SearchMovieDrawer />

          <Link
            href="/my-collections"
            className="rounded-lg px-4 py-2 bg-accent/90 hover:bg-accent text-white border-0 text-sm font-medium transition-colors"
          >
            <span>My collections</span>
          </Link>
          {user.id ?
            <UserMenu />
          : <AuthModal>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 justify-center gap-0 rounded-lg border-border bg-input/40 px-4 text-foreground shadow-sm transition-colors hover:border-accent/45 hover:bg-accent/12 hover:text-accent-foreground"
              >
                <span className="text-sm font-semibold tracking-tight">Sign in</span>
              </Button>
            </AuthModal>
          }
        </div>
      </div>
    </header>
  );
};
