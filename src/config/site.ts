import { serviceCategories } from "@/data/services";

const DEFAULT_SITE_URL = "https://masterpro.kg";

// Адрес сайта берётся из NEXT_PUBLIC_SITE_URL. Пустое или некорректное значение
// заменяется запасным, а https:// дописывается, если его забыли.
function resolveSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "MasterPro.kg",
   url: resolveSiteUrl(),
  locale: "ru_RU",
  description:
    "Выездные мастера в Бишкеке и ближайших пригородах: прочистка засоров, сантехник, электрик, ремонт водонагревателей Ariston.",

  phone: {
    display: "+996 880 673 038",
    e164: "+996880673038",
  },
  whatsappNumber: "996880673038",
  // Заполним, когда появится Telegram как канал связи
  telegramUsername: null as string | null,

  schedule: "Круглосуточно, 24/7",

  area: {
    text: "Бишкек и ближайшие пригороды",
    notServed: ["Кант", "Сокулук"],
  },

  warranty: {
    clogsDays: 7,
    standardDays: 30,
    aristonDays: 30,
  },
};

export const phoneHref = `tel:${siteConfig.phone.e164}`;
export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}`;

export const navItems = [
  ...serviceCategories.map((s) => ({ label: s.shortTitle, href: s.href })),
  { label: "Цены", href: "/prices/" },
  { label: "Отзывы", href: "/reviews/" },
  { label: "Контакты", href: "/contacts/" },
];