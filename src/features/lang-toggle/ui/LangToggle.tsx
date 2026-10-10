"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useLangToggle } from "../lib/useLangToggle";

type Lang = "Ru" | "En";

export const LangToggle = () => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const { mutate: toggleLang } = useLangToggle();

  const switchTo = (lang: Lang) => {
    const nextLocale = lang === "Ru" ? "ru" : "en";
    toggleLang({ language: nextLocale });

    const nextPath = pathname.replace(/^\/(ru|en)/, `/${nextLocale}`);
    const query = searchParams.toString();

    startTransition(() => router.replace(query ? `${nextPath}?${query}` : nextPath));
  };

  const detectedLanguage = locale === "ru" ? "En" : "Ru";

  return (
    <Button
      onClick={() => switchTo(detectedLanguage)}
      className="flex items-center h-auto font-medium text-sm transition-colors p-0 justify-start w-fit"
    >
      <span className={cn(locale === "ru" ? "text-foreground" : "text-muted")}>RU</span>
      <div className="mx-1 size-1 rounded-full bg-muted/50"></div>
      <span className={cn(locale === "en" ? "text-foreground" : "text-muted")}>EN</span>
    </Button>
  );
};
