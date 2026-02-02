import "@/app/styles/globals.css";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { Header } from "@/widgets";
// import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const messages = await getMessages();
  const locale = (await params).locale;

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          {/* <SidebarProvider> */}
          <Header />
          {/* <Sidebar /> */}

          {children}

          {/* </SidebarProvider> */}
          {/* </ThemeProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
