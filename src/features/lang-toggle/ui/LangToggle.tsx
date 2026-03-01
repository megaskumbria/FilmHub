"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/shared/ui";
import { cn } from "@/lib/utils";

type Lang = "Ru" | "En";

export const LangToggle = () => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchTo = (lang: Lang) => {
    const newPath = pathname.replace(/^\/(ru|en)/, `/${lang}`);

    startTransition(() => {
      router.replace(newPath);
    });
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
