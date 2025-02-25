import GlobalProvider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quản lý chi tiêu",
  description: "Theo dõi chi tiêu hàng ngày",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <meta name="apple-mobile-web-app-title" content="Tracker" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <TooltipProvider delayDuration={500} disableHoverableContent>
          <GlobalProvider>
            <div
              data-vaul-drawer-wrapper=""
              className="min-h-screen bg-background"
            >
              {children}
            </div>
            <Toaster richColors position="top-center" />
          </GlobalProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
