import type { ServiceId } from "@/data/services";

export type PriceUnit = "work" | "meter";

export interface PriceItem {
  name: string;
  /** Цена «от» в сомах. null = стоимость уточняется после диагностики */
  from: number | null;
  unit?: PriceUnit;
}

export interface PriceCategory {
  id: ServiceId;
  title: string;
  items: PriceItem[];
}

export const PRICE_UNKNOWN = "Стоимость уточняется после диагностики";

export const PRICE_DISCLAIMER =
  "Цены указаны за работу и являются ориентировочными. Итоговая стоимость зависит от сложности неисправности, объёма работ и необходимости замены деталей. Стоимость материалов и запчастей рассчитывается отдельно.";

export function formatPrice(item: PriceItem): string {
  if (item.from === null) return PRICE_UNKNOWN;
  const amount = String(item.from).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  const suffix = item.unit === "meter" ? " за пог.\u00A0м" : "";
  return `от ${amount}\u00A0сом${suffix}`;
}

export const priceCategories: PriceCategory[] = [
  {
    id: "zasory",
    title: "Прочистка засоров",
    items: [
      { name: "Прочистка сифона", from: 500 },
      { name: "Прочистка раковины / мойки", from: 700 },
      { name: "Прочистка ванны / душевой", from: 800 },
      { name: "Прочистка унитаза", from: 800 },
      { name: "Устранение засора канализационной трубы", from: 1000 },
      { name: "Механическая прочистка труб", from: 1500 },
      { name: "Гидродинамическая прочистка", from: 2000 },
      { name: "Прочистка канализации в частном доме", from: 2000 },
      { name: "Удаление сложных жировых засоров", from: 1500 },
    ],
  },
  {
    id: "santehnik",
    title: "Сантехнические работы",
    items: [
      { name: "Устранение протечки", from: 500 },
      { name: "Замена прокладки", from: 300 },
      { name: "Замена сифона", from: 700 },
      { name: "Замена смесителя", from: 700 },
      { name: "Установка смесителя", from: 800 },
      { name: "Установка раковины", from: 1200 },
      { name: "Установка унитаза", from: 1800 },
      { name: "Установка ванны", from: 3000 },
      { name: "Подключение стиральной машины", from: 1000 },
      { name: "Подключение посудомоечной машины", from: 1000 },
      { name: "Замена водопроводных труб", from: 500, unit: "meter" },
      { name: "Установка фильтра для воды", from: 700 },
      { name: "Монтаж душевой кабины", from: 3000 },
    ],
  },
  {
    id: "elektrik",
    title: "Электромонтажные работы",
    items: [
      { name: "Замена розетки", from: 300 },
      { name: "Установка розетки", from: 400 },
      { name: "Замена выключателя", from: 300 },
      { name: "Установка выключателя", from: 400 },
      { name: "Установка люстры", from: 700 },
      { name: "Установка светильника", from: 500 },
      { name: "Замена автомата", from: 400 },
      { name: "Установка УЗО", from: 700 },
      { name: "Поиск короткого замыкания", from: 700 },
      { name: "Ремонт электрощита", from: 1500 },
      { name: "Перенос розетки", from: 800 },
      { name: "Прокладка электропроводки", from: 150, unit: "meter" },
    ],
  },
  {
    id: "ariston",
    title: "Ремонт водонагревателей",
    items: [
      { name: "Диагностика водонагревателя", from: 500 },
      { name: "Очистка от накипи", from: 1200 },
      { name: "Замена магниевого анода", from: 800 },
      { name: "Замена термостата", from: 1000 },
      { name: "Замена ТЭНа", from: 1500 },
      { name: "Устранение протечки", from: 800 },
      { name: "Ремонт электрической части", from: 1000 },
      { name: "Ремонт платы управления", from: 1500 },
      { name: "Установка водонагревателя", from: 2000 },
      { name: "Демонтаж водонагревателя", from: 700 },
    ],
  },
];