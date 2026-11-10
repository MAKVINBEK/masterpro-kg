import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { siteConfig } from "@/config/site";
import { YandexMetrica } from "@/components/analytics/YandexMetrica";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — выездные мастера в Бишкеке`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  verification: {
    google: siteConfig.verification.google || undefined,
    yandex: siteConfig.verification.yandex || undefined,
  },
    openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "MasterPro.kg — выездные мастера в Бишкеке",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#123B68",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomBar />
        <YandexMetrica />
      </body>
    </html>
  );
}