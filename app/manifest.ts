import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const manifest = (): MetadataRoute.Manifest => ({
  name: SITE.name,
  short_name: "Pré-Black Bengô",
  description: SITE.description,
  start_url: "/",
  display: "standalone",
  background_color: "#0e0d1c",
  theme_color: "#0e0d1c",
  lang: "pt-BR",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
});

export default manifest;
