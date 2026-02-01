import createMiddleware from "next-intl/middleware";
import { locales } from "@/shared/config/i18n/locales-config";

export default createMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
