"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

export type Locale = "ru" | "en";

export const useSwitchLocale = () => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  return (nextLocale: Locale) => {
    if (nextLocale === currentLocale) return false;

    const nextPath = pathname.replace(/^\/(ru|en)/, `/${nextLocale}`);
    const query = searchParams.toString();

    startTransition(() => router.replace(query ? `${nextPath}?${query}` : nextPath));
    return true;
  };
};
