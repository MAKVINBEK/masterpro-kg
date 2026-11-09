import type { Metadata } from "next";
import { Advantages } from "@/components/sections/Advantages";
import { Hero } from "@/components/sections/Hero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { PopularServices } from "@/components/sections/PopularServices";
import { ServiceCategories } from "@/components/sections/ServiceCategories";

export const metadata: Metadata = {
  title: {
    absolute: "Сантехник, электрик и прочистка засоров в Бишкеке | MasterPro.kg",
  },
  description:
    "Вызов сантехника, электрика и мастера по прочистке засоров в Бишкеке. Ремонт водонагревателей Ariston. Работаем круглосуточно, гарантия 7–30 дней.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCategories />
      <PopularServices />
      <Advantages />
      <HowWeWork />
    </>
  );
}