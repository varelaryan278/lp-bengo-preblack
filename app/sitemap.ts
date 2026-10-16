import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: SITE_URL,
    changeFrequency: "daily",
    priority: 1,
    images: [`${SITE_URL}/opengraph-image`],
  },
];

export default sitemap;
