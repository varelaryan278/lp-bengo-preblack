import { LIVE_DATE } from "@/lib/event";
import { SITE, SITE_URL } from "@/lib/site";

const endDate = new Date(new Date(LIVE_DATE).getTime() + 2 * 60 * 60 * 1000).toISOString();

const organization = {
  "@type": "Organization",
  "@id": "https://bengoacai.com/#organization",
  name: "Bengô Açaí",
  url: "https://bengoacai.com",
  logo: `${SITE_URL}/icon-512.png`,
};

const data = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE.title,
      description: SITE.description,
      inLanguage: "pt-BR",
      publisher: { "@id": organization["@id"] },
      primaryImageOfPage: `${SITE_URL}/opengraph-image.jpg`,
    },
    {
      "@type": "Event",
      name: "Live Pré-Black Bengô Açaí",
      description: SITE.description,
      startDate: LIVE_DATE,
      endDate,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: { "@type": "VirtualLocation", url: SITE_URL },
      image: [`${SITE_URL}/opengraph-image.jpg`],
      organizer: { "@id": organization["@id"] },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
        availability: "https://schema.org/LimitedAvailability",
        url: SITE_URL,
      },
    },
  ],
};

export const JsonLd = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
);
