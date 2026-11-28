"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/shared/config/i18n/locales-config";

export type { Locale };

const localePrefix = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

export const useSwitchLocale = () => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  return (nextLocale: Locale) => {
    if (nextLocale === currentLocale) return false;

    const nextPath = pathname.replace(localePrefix, `/${nextLocale}`);
    const query = searchParams.toString();

    startTransition(() => router.replace(query ? `${nextPath}?${query}` : nextPath));
    return true;
  };
};
