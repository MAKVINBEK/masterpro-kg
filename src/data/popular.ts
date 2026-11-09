import { priceCategories, type PriceItem } from "@/data/prices";
import type { ServiceId } from "@/data/services";

// Названия должны точно совпадать с названиями в prices.ts
const popularList: { category: ServiceId; name: string }[] = [
  { category: "zasory", name: "Прочистка раковины / мойки" },
  { category: "zasory", name: "Прочистка унитаза" },
  { category: "santehnik", name: "Замена смесителя" },
  { category: "santehnik", name: "Подключение стиральной машины" },
  { category: "elektrik", name: "Установка розетки" },
  { category: "elektrik", name: "Установка люстры" },
  { category: "ariston", name: "Диагностика водонагревателя" },
  { category: "ariston", name: "Замена ТЭНа" },
];

export interface PopularService {
  category: ServiceId;
  categoryTitle: string;
  item: PriceItem;
}

export const popularServices: PopularService[] = popularList.map(
  ({ category, name }) => {
    const cat = priceCategories.find((c) => c.id === category);
    const item = cat?.items.find((i) => i.name === name);
    if (!cat || !item) {
      throw new Error(`Популярная услуга не найдена в prices.ts: ${name}`);
    }
    return { category, categoryTitle: cat.title, item };
  },
);