"use client";

import { IconMenu2 } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
}

export const HeaderMenu = ({ links }: Props) => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const pathWithoutLocale = pathname.replace(/^\/(en|ru)(?=\/|$)/, "") || "/";

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={t("menu.open")}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-foreground"
        >
          <IconMenu2 className="size-4.5" stroke={2} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-48 rounded-2xl border-border bg-card p-1.5 text-card-foreground shadow-lg"
      >
        <nav>
          <ul className="flex flex-col">
            {links.map(({ href, label }) => {
              const isActive = pathWithoutLocale === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex h-10 items-center rounded-xl px-3 text-base font-medium transition-colors",
                      isActive ? "text-foreground" : (
                        "text-zinc-muted hover:bg-white/5 hover:text-zinc-light"
                      ),
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
};
