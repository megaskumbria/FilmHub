import "@/app/styles/globals.css";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Manrope, Unbounded } from "next/font/google";
import { Header, AuthModal } from "@/widgets";
import { Toaster, TooltipProvider } from "@/shared/ui";
import { ReactQueryProvider, AuthProvider } from "@/shared/providers";
import { cookies } from "next/headers";
import { API_URL } from "@/shared/constants/constants";
import { type User } from "@/features/auth/model/auth.store";
import axios from "axios";

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

  const { data: user } = await axios.get<User>(`${API_URL}/auth/me`, {
    headers: { cookie: cookieStore.toString() },
  });

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
                <Header initialUser={user} />
                {children}
                {/* </ThemeProvider> */}
              </AuthProvider>
            </TooltipProvider>

            <AuthModal />
            <Toaster />
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
