"use client";

import Link from "next/link";
import { Button } from "@/shared/ui";
import { SearchMovieDrawer, AuthModal, UserMenu } from "@/widgets";
// import { LogoSvg } from "@/shared/assets/LogoSvg";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border px-4 py-4">
      <div className="flex w-full items-center justify-between gap-3">
        <nav className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            className="shrink-0 text-2xl flex items-baseline gap-0.5 font-bold tracking-tight transition-colors hover:opacity-90"
          >
            {/* <span className="text-primary">Film</span>
            <span className="text-accent">Hub</span> */}
            {/* <Image src="/Logo.webp" alt="Logo" width={100} height={100} /> */}
          </Link>

          <Link href="/" className="text-base font-medium text-primary">
            Главная
          </Link>

          <Link href="/movie-search" className="text-base font-medium text-primary">
            Фильмы
          </Link>

          <AuthModal>
            <Button variant="outline">Рега (триггер кнопка)</Button>
          </AuthModal>
        </nav>

        <div className="flex items-center gap-2">
          <SearchMovieDrawer />

          <Button className="rounded-sm p-1.5 bg-accent hover:bg-accent/80 text-secondary-foreground border-0 transition-colors">
            Мои коллекции
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
