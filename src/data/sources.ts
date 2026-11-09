import type { ServiceId } from "@/data/services";

export interface PageSource {
  label: string;
  /** Услуга, которая выбирается в форме по умолчанию на этой странице */
  service?: ServiceId;
}

export const pageSources: Record<string, PageSource> = {
  "/": { label: "Главная страница" },
  "/ustranenie-zasorov/": { label: "Страница: прочистка засоров", service: "zasory" },
  "/uslugi-santehnika/": { label: "Страница: услуги сантехника", service: "santehnik" },
  "/uslugi-elektrika/": { label: "Страница: услуги электрика", service: "elektrik" },
  "/remont-ariston/": { label: "Страница: ремонт Ariston", service: "ariston" },
  "/prices/": { label: "Страница: цены" },
  "/reviews/": { label: "Страница: отзывы" },
  "/contacts/": { label: "Страница: контакты" },
  "/privacy/": { label: "Страница: политика конфиденциальности" },
};

export function normalizePath(path: string): string {
  if (!path) return "";
  const clean = path.split("?")[0].split("#")[0];
  return clean.endsWith("/") ? clean : `${clean}/`;
}