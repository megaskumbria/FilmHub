import "@/app/styles/globals.css";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Manrope, Unbounded } from "next/font/google";
import { Header } from "@/widgets";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { Toaster } from "@/shared/ui/sonner";
import { ReactQueryProvider, AuthProvider } from "@/shared/providers";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const messages = await getMessages();
  const locale = (await params).locale;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const user =
    accessToken ? jwtDecode<{ sub: string; email: string; username: string }>(accessToken) : null;

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${unbounded.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            {/* <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            <TooltipProvider>
              <AuthProvider initialUser={user}>
                <Header />
                {children}
                {/* </ThemeProvider> */}
              </AuthProvider>
            </TooltipProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
