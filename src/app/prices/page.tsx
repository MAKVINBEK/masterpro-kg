import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OrderSection } from "@/components/sections/OrderSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { PriceTable } from "@/components/ui/PriceTable";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { PRICE_DISCLAIMER, priceCategories } from "@/data/prices";
import { serviceCategories, type ServiceId } from "@/data/services";

export const metadata: Metadata = {
  title: "Цены на услуги сантехника и электрика в Бишкеке",
  description:
    "Ориентировочные цены на прочистку засоров, услуги сантехника и электрика, ремонт водонагревателей Ariston в Бишкеке. Цены указаны за работу, материалы отдельно.",
  alternates: { canonical: "/prices/" },
};

const { clogsDays, standardDays, aristonDays } = siteConfig.warranty;

const warranty: Record<ServiceId, string> = {
  zasory: `Гарантия на устранение засоров: ${clogsDays} дней.`,
  santehnik: `Гарантия на стандартные сантехнические работы: ${standardDays} дней.`,
  elektrik: `Гарантия на стандартные электромонтажные работы: ${standardDays} дней.`,
  ariston: `Гарантия на ремонт водонагревателей: ${aristonDays} дней.`,
};

export default function PricesPage() {
  return (
    <>
      <PageHeader
        crumb="Цены"
        title="Цены на услуги мастеров в Бишкеке"
        lead="Ориентировочная стоимость работ по четырём направлениям. Точную цену согласуем до начала работ."
      >
        <p className="mt-6 max-w-3xl rounded-xl bg-surface p-4 text-sm leading-relaxed text-muted">
          {PRICE_DISCLAIMER}
        </p>
        <nav aria-label="Разделы цен" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {priceCategories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {priceCategories.map((category, i) => {
        const service = serviceCategories.find((s) => s.id === category.id);
        return (
          <Section
            key={category.id}
            id={category.id}
            tone={i % 2 === 0 ? "surface" : "white"}
          >
            <SectionHeading title={category.title} description={warranty[category.id]} />
            <PriceTable category={category} />
            {service && (
              <Link
                href={service.href}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary"
              >
                Подробнее: {service.title}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
          </Section>
        );
      })}

      <OrderSection tone="surface" />
    </>
  );
}