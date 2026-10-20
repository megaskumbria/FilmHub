"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IconBookmarks } from "@tabler/icons-react";
import { Button, Separator } from "@/shared/ui";
import { SearchMovieDrawer, UserMenu } from "@/widgets";
import { cn } from "@/shared/lib/utils";
import { useAuthStore, useAuthModalStore, type User } from "@/features/auth";

interface Props {
  initialUser: User | null;
}

export const Header = ({ initialUser }: Props) => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const pathWithoutLocale = pathname.replace(/^\/(en|ru)(?=\/|$)/, "") || "/";

  const openAuthModal = useAuthModalStore((s) => s.open);

  const { hasHydrated, user } = useAuthStore();
  const userId = hasHydrated ? user.id : (initialUser?.id ?? null);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/movie-search", label: t("movies") },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        scrolled ?
          "border-border/60 bg-background/95"
        : "border-transparent bg-linear-to-b from-black/80 via-black/30 to-transparent",
      )}
    >
      <div className="flex h-16 w-full items-stretch justify-between gap-4 px-4">
        <div className="flex min-w-0 items-stretch gap-4">
          <Link
            href="/"
            aria-label="FilmHub"
            className={cn("group flex shrink-0 items-center gap-2.5 self-center rounded-lg")}
          >
            <span className="hidden font-unbounded text-lg font-semibold tracking-tight sm:inline">
              <span className="text-foreground">Film</span>
              <span className="text-accent">Hub</span>
            </span>
          </Link>

          <nav className="flex items-stretch">
            <ul className="flex items-stretch gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathWithoutLocale === href;

                return (
                  <li key={href} className="flex">
                    <Link
                      href={href}
                      className={cn(
                        "relative flex items-center whitespace-nowrap px-3 text-base font-medium transition-colors",
                        isActive ? "text-foreground" : "text-zinc-muted hover:text-zinc-light",
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchMovieDrawer />

          <Separator orientation="vertical" className="hidden h-6 bg-white/10 sm:block" />

          {userId && (
            <Button
              asChild
              variant="transparent"
              className={cn(
                "h-9 gap-2 rounded-lg bg-accent px-3 text-accent-foreground transition-colors hover:bg-(--button-hover) sm:px-4",
              )}
            >
              <Link href={`/collections/${userId}`}>
                <IconBookmarks className="size-4.5" stroke={2} />
                <span className="hidden text-sm font-semibold sm:inline">{t("myCollections")}</span>
              </Link>
            </Button>
          )}

          {userId ?
            <UserMenu initialUser={initialUser} />
          : <Button
              type="button"
              variant="transparent"
              className={cn(
                "h-9 rounded-lg bg-foreground px-4 text-background transition-colors hover:bg-zinc-light",
              )}
              onClick={openAuthModal}
            >
              <span className="text-sm font-semibold">{t("signIn")}</span>
            </Button>
          }
        </div>
      </div>
    </header>
  );
};
