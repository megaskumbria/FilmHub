import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales } from "./src/shared/config/i18n/locales-config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

export default async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken && refreshToken) {
    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh`,
      {
        method: "GET",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    if (apiResponse.ok) {
      const response = intlMiddleware(request);

      const setCookie = apiResponse.headers.get("set-cookie");

      if (setCookie) {
        response.headers.set("set-cookie", setCookie);
      }

      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|locales).*)",
  ],
};