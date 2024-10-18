import GlobalProvider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Be_Vietnam_Pro as FontSans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
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
