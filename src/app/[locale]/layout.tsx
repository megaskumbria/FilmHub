import "@/app/styles/globals.css";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Manrope } from "next/font/google";
import { Header } from "@/widgets";
import { TooltipProvider } from "@/shared/ui/tooltip";
// import { ThemeProvider } from "next-themes";
import { Toaster } from "@/shared/ui/sonner";
import { ReactQueryProvider } from "@/shared/providers";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
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
    <html lang={locale} className={manrope.variable} suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            {/* <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            {/* <SidebarProvider> */}
            <TooltipProvider>
              <Header />
              {/* <Sidebar /> */}

              {children}

              {/* </SidebarProvider> */}
              {/* </ThemeProvider> */}
            </TooltipProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
