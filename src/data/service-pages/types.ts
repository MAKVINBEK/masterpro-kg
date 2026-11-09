import type { FaqItem } from "@/data/faq";
import type { MediaImage } from "@/data/media";
import type { ServiceId } from "@/data/services";

export interface RelatedLink {
  href: string;
  title: string;
  text: string;
}

export interface ServicePageContent {
  id: ServiceId;
  path: string;
  breadcrumb: string;
  meta: { title: string; description: string };
  hero: { h1: string; lead: string; image: MediaImage | null };
  includes: { title: string; items: string[] };
  situations: { title: string; items: string[] };
  approach: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
  };
  warranty: { days: number; text: string };
  beforeArrival: { title: string; items: string[] };
  faq: { title: string; items: FaqItem[] };
  related: RelatedLink[];
  /** Мелкая сноска внизу страницы (необязательно) */
  note?: string;
}