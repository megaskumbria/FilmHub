import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales } from "@/shared/config/i18n/locales-config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

export default async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken || !refreshToken) return intlMiddleware(request);

  try {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });

    if (!apiResponse.ok) return intlMiddleware(request);

    const response = intlMiddleware(request);

    for (const cookie of apiResponse.headers.getSetCookie()) {
      response.headers.append("set-cookie", cookie);
    }

    return response;
  } catch {
    return intlMiddleware(request);
  }
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
