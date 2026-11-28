export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export interface LocaleOption {
  code: Locale;
  endonym: string;
  label: string;
}

export const localeOptions: readonly LocaleOption[] = [
  { code: "ru", endonym: "Русский", label: "RU" },
  { code: "en", endonym: "English", label: "EN" },
];
