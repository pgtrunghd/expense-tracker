import GlobalProvider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Be_Vietnam_Pro as FontSans } from "next/font/google";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="24x24"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/png"
          sizes="16x16"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
            <Toaster richColors />
          </GlobalProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
