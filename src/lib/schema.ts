import { siteConfig } from "@/config/site";
import type { PriceCategory } from "@/data/prices";
import type { ServicePageContent } from "@/data/service-pages/types";

const abs = (path: string) => `${siteConfig.url}${path}`;

export const businessId = abs("/#business");

// Подтверждена только зона «Бишкек». Если расширите зону, меняйте здесь.
const bishkek = {
  "@type": "City",
  name: "Бишкек",
  containedInPlace: { "@type": "Country", name: "Кыргызстан" },
};

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: siteConfig.name,
    url: abs("/"),
    description: siteConfig.description,
    telephone: siteConfig.phone.e164,
    areaServed: bishkek,
    // Режим 24/7 подтверждён владельцем. Если график изменится, обновите и siteConfig.schedule
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: allDays,
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone.e164,
      contactType: "customer service",
      availableLanguage: "ru",
    },
  };
}

export function serviceSchema(content: ServicePageContent, category: PriceCategory) {
  const offers = category.items.flatMap((item) =>
    item.from === null
      ? []
      : [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.name },
            priceSpecification:
              item.unit === "meter"
                ? {
                    "@type": "UnitPriceSpecification",
                    minPrice: item.from,
                    priceCurrency: "KGS",
                    unitCode: "MTR",
                  }
                : {
                    "@type": "PriceSpecification",
                    minPrice: item.from,
                    priceCurrency: "KGS",
                  },
          },
        ],
  );

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`${content.path}#service`),
    name: content.hero.h1,
    serviceType: category.title,
    description: content.meta.description,
    url: abs(content.path),
    areaServed: bishkek,
    provider: {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: siteConfig.name,
      url: abs("/"),
      telephone: siteConfig.phone.e164,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.title,
      itemListElement: offers,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}