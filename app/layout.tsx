import type { Metadata, Viewport } from "next";
import { Kanit, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE, SITE_URL } from "@/lib/site";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: `%s · ${SITE.shortTitle}` },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: "Bengô Açaí", url: "https://bengoacai.com" }],
  creator: "Bengô Açaí",
  publisher: "Bengô Açaí",
  category: "business",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE.name,
    title: "Pré-Black Bengô Açaí · Live exclusiva",
    description: "A condição de franquia mais agressiva do ano, liberada ao vivo. Acesso só pelo grupo VIP.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pré-Black Bengô Açaí · Live exclusiva",
    description: "A condição de franquia mais agressiva do ano, liberada ao vivo. Acesso só pelo grupo VIP.",
  },
  appleWebApp: { capable: true, title: "Pré-Black Bengô", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0e0d1c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={cn("dark h-full", "antialiased", kanit.variable, "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
