import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { reviews } from "@/data/reviews";
import { serviceCategories } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...serviceCategories.map((s) => s.href),
    "/prices/",
    // Страница отзывов индексируется только когда на ней есть отзывы
    ...(reviews.length > 0 ? ["/reviews/"] : []),
    "/contacts/",
  ];

  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }));
}