import "@/app/styles/globals.css";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { Header } from "@/widgets";
import { ThemeProvider } from "next-themes";

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
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <SidebarProvider> */}
            <div className="min-h-dvh flex flex-col bg-[#1A1A1A] text-[#e5e5e5]">
              <Header />
              {/* <Sidebar /> */}

              <main className="flex-1">{children}</main>
            </div>
            {/* </SidebarProvider> */}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
