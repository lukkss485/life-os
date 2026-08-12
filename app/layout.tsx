
import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code, Geist, Instrument_Sans } from "next/font/google"; // não existe no next/font
import Providers from "../lib/providers";
import "./globals.css";
import { Dock, Header } from "@/components/header";
import * as React from "react";
import { PluginsProvider } from "@/components/PluginsContext";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const instrumentSansHeading = Instrument_Sans({ subsets: ['latin'], variable: '--font-heading' });

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Olá, Lucas",
  description: "Life OS do Lucas",
  icons: {
    icon: "/logo.svg",
  }
};
// ------------------------------------------

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full ", "antialiased ", "font-sans ", geist.variable, " ", instrumentSansHeading.variable)}
    >
      <head />
      <body className="min-h-full flex flex-col relative">
        <PluginsProvider>
          <Providers>
            <Dock />
            <Header>

              {children}
              <Toaster position="bottom-right" duration={8000} />
            </Header>
          </Providers>
        </PluginsProvider>
      </body>
    </html>
  );
}
