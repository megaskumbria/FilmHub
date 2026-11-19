"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IconBookmarks } from "@tabler/icons-react";
import { Button, Separator } from "@/shared/ui";
import { SearchMovieDrawer, UserMenu } from "@/widgets";
import { HeaderMenu } from "./HeaderMenu";
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
    { href: "/", label: t("collections") },
    { href: "/catalog", label: t("catalog") },
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
      <div className="flex h-16 w-full items-stretch justify-between gap-3 px-3 xs:gap-4 xs:px-4">
        <div className="flex shrink-0 items-stretch gap-3 xs:gap-4">
          <Link
            href="/"
            aria-label="FilmHub"
            className="group flex shrink-0 items-center self-center rounded-lg"
          >
            <span className="font-unbounded text-2xl font-semibold tracking-tight whitespace-nowrap">
              <span className="text-foreground">Film</span>
              <span className="text-accent">Hub</span>
            </span>
          </Link>

          <nav className="hidden items-stretch min-[520px]:flex">
            <ul className="flex items-stretch gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathWithoutLocale === href;

                return (
                  <li key={href} className="flex">
                    <Link
                      href={href}
                      className={cn(
                        "relative flex items-center px-3 text-base font-medium whitespace-nowrap transition-colors",
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

        <div className="flex shrink-0 items-center gap-1.5 min-[520px]:gap-2 xs:gap-3">
          <SearchMovieDrawer />

          <Separator orientation="vertical" className="h-6 bg-white/10" />

          <div className="min-[520px]:hidden">
            <HeaderMenu links={navLinks} />
          </div>

          {userId && (
            <Button
              asChild
              variant="transparent"
              className="hidden size-9 shrink-0 rounded-lg bg-accent p-0 text-accent-foreground transition-colors hover:bg-(--button-hover) min-[520px]:inline-flex xs:w-auto xs:gap-2 xs:px-4"
            >
              <Link href={`/collections/${userId}`} aria-label={t("myCollections")}>
                <IconBookmarks className="size-4.5 shrink-0" stroke={2} />
                <span className="hidden text-sm font-semibold whitespace-nowrap xs:inline">
                  {t("myCollections")}
                </span>
              </Link>
            </Button>
          )}

          {userId ?
            <UserMenu initialUser={initialUser} />
          : <Button
              type="button"
              variant="transparent"
              className="h-9 shrink-0 rounded-lg bg-foreground px-3 text-background whitespace-nowrap transition-colors hover:bg-zinc-light xs:px-4"
              onClick={openAuthModal}
            >
              <span className="text-sm font-semibold whitespace-nowrap">{t("signIn")}</span>
            </Button>
          }
        </div>
      </div>
    </header>
  );
};
