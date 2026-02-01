import "@/app/styles/globals.css";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { Header } from "@/widgets";
import { Sidebar, SidebarProvider } from "@/shared/ui/sidebar";

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
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider>
            <div className="grid grid-cols-[288px_1fr_1fr_1fr_1fr] grid-rows-[60px,1fr] h-screen">
              <div className="col-span-full row-start-1 row-end-2">
                <Header />
              </div>
              <div className="col-start-1 col-end-2 row-start-2 row-end-3 overflow-y-auto">
                <Sidebar />
              </div>
            </div>

            {children}
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
