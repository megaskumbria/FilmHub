import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./locales-config";
import { GetRequestConfigParams, RequestConfig } from "next-intl/server";

type Locale = "en" | "ru";
type Messages = Record<string, string>;
type MessagesModule = { default: Messages };

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams): Promise<RequestConfig> => {
    const locale = await requestLocale;
    if (!locales.includes(locale as Locale)) notFound();

    const messagesModule = (await import(
      `../../../../public/locales/${locale}.json`
    )) as MessagesModule;

    return {
      locale: locale as Locale,
      messages: messagesModule.default,
    };
  },
);
