"use client";

import { useLocale, useTranslations } from "next-intl";
import { IconCheck, IconChevronDown, IconLanguage } from "@tabler/icons-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { useSwitchLocale, type Locale } from "@/shared/hooks";
import { localeOptions } from "@/shared/config/i18n/locales-config";
import { useLangToggle } from "../lib/useLangToggle";

export const LangToggle = () => {
  const t = useTranslations("header.menu");

  const locale = useLocale() as Locale;

  const switchLocale = useSwitchLocale();

  const { mutate: saveLanguage } = useLangToggle();

  const current = localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  const selectLanguage = (next: Locale) => {
    if (next === locale) return;

    saveLanguage({ language: next });
    switchLocale(next);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className="group h-10 w-full justify-start gap-3 rounded-xl px-1 text-card-foreground transition-colors hover:bg-white/5 data-[state=open]:bg-white/6"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-primary">
            <IconLanguage size={16} stroke={2} />
          </span>

          <span className="flex-1 text-left">{t("language")}</span>
          <span className="text-sm text-muted">{current.endonym}</span>

          <IconChevronDown
            size={16}
            stroke={2}
            className="text-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="z-60 max-h-64 w-(--radix-dropdown-menu-trigger-width) rounded-xl border-border bg-card p-1 text-card-foreground shadow-md"
      >
        {localeOptions.map((option) => {
          const selected = option.code === locale;

          return (
            <DropdownMenuItem
              key={option.code}
              onSelect={() => selectLanguage(option.code)}
              className="cursor-pointer rounded-lg px-2.5 py-2 text-card-foreground focus:bg-white/8 focus:text-foreground data-highlighted:bg-white/8 data-highlighted:text-foreground"
            >
              <span className="flex-1">{option.endonym}</span>
              {selected && <IconCheck size={16} stroke={2} className="text-foreground" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
