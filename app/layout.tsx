import type { Metadata, Viewport } from "next";
import { Kanit, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "Pré-Black Bengô Açaí · Live exclusiva para futuros franqueados",
  description:
    "Entre no grupo VIP da Pré-Black Bengô Açaí e garanta acesso à live exclusiva com a condição de franquia mais agressiva do ano.",
  openGraph: {
    title: "Pré-Black Bengô Açaí · Live exclusiva",
    description: "Condição de franquia nunca liberada. Só para quem estiver no grupo.",
    images: ["/images/hero-pote.png"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0d1c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={cn("dark h-full", "antialiased", kanit.variable, "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
