import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../components/I18nProvider";
import { LanguageToggle } from "../components/LanguageToggle";
import { ClientOnly } from "../components/ClientOnly";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Property Pilot - Real Estate Calculators",
  description:
    "Professional real estate calculators for mortgage, closing costs, and rental ROI analysis",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <I18nProvider>
          {children}
          <ClientOnly>
            <LanguageToggle />
          </ClientOnly>
        </I18nProvider>
      </body>
    </html>
  );
}
