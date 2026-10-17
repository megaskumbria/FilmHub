"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/shared/ui";
import { SearchMovieDrawer, UserMenu } from "@/widgets";
import { cn } from "@/shared/lib/utils";
import { useAuthStore, useAuthModalStore, type User } from "@/features/auth";
// import { LogoSvg } from "@/shared/assets/LogoSvg";

interface Props {
  initialUser: User | null;
}

export const Header = ({ initialUser }: Props) => {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);

  const openAuthModal = useAuthModalStore((s) => s.open);

  const { hasHydrated, user } = useAuthStore();
  const userId = hasHydrated ? user.id : (initialUser?.id ?? null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full px-10 py-3 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:transition-colors after:duration-300",
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
            {t("home")}
          </Link>

          <Link
            href="/movie-search"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            {t("movies")}
          </Link>

          {!userId && (
            <Link
              href="/about"
              className="hidden whitespace-nowrap text-sm font-medium text-white/80 transition-colors hover:text-white md:inline-block"
            >
              {t("about")}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <SearchMovieDrawer />

          {userId && (
            <Link
              href={`/collections/${userId}`}
              className="flex h-9 items-center gap-2 rounded-lg bg-linear-to-r from-accent to-accent/80 px-4 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:from-accent/90 hover:to-accent/70"
            >
              <Bookmark className="size-4" />
              <span>{t("myCollections")}</span>
            </Link>
          )}

          {userId ?
            <UserMenu initialUser={initialUser} />
          : <Button
              type="button"
              variant="transparent"
              size="sm"
              className="h-9 justify-center gap-0 rounded-lg border border-white/20 bg-white/10 px-4 text-white shadow-sm transition-colors hover:border-accent/40 hover:bg-white/20"
              onClick={openAuthModal}
            >
              <span className="text-sm font-semibold tracking-tight">{t("signIn")}</span>
            </Button>
          }
        </div>
      </div>
    </header>
  );
};
