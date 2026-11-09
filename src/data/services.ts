export const serviceCategories = [
  {
    id: "zasory",
    title: "Устранение засоров",
    shortTitle: "Засоры",
    href: "/ustranenie-zasorov/",
  },
  {
    id: "santehnik",
    title: "Услуги сантехника",
    shortTitle: "Сантехника",
    href: "/uslugi-santehnika/",
  },
  {
    id: "elektrik",
    title: "Услуги электрика",
    shortTitle: "Электрика",
    href: "/uslugi-elektrika/",
  },
  {
    id: "ariston",
    title: "Ремонт водонагревателей Ariston",
    shortTitle: "Ремонт Ariston",
    href: "/remont-ariston/",
  },
] as const;

export type ServiceId = (typeof serviceCategories)[number]["id"];