"use client";

import { useLocale } from "next-intl";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useSwitchLocale, type Locale } from "@/shared/hooks";
import { useLangToggle } from "../lib/useLangToggle";

export const LangToggle = () => {
  const locale = useLocale();
  const switchLocale = useSwitchLocale();

  const { mutate: toggleLang } = useLangToggle();

  const switchTo = (lang: Locale) => {
    const nextLocale = lang === "ru" ? "ru" : "en";
    toggleLang({ language: nextLocale });
    switchLocale(nextLocale);
  };

  const detectedLanguage = locale === "ru" ? "en" : "ru";

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
