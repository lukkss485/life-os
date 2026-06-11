import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google"; // não existe no next/font
import Providers from "../lib/providers";
import "./globals.css";
import { Header } from "@/components/header";

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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={` ${googleSans.variable} ${googleSansCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
            <Header>
              {children}
            </Header>
        </Providers>
      </body>
    </html>
  );
}