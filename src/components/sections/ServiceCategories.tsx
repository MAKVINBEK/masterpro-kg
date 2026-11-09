import { ArrowRight, Droplets, Flame, Wrench, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { formatPrice, priceCategories } from "@/data/prices";
import { serviceCategories, type ServiceId } from "@/data/services";

const meta = {
  zasory: {
    icon: Droplets,
    text: "Раковины, ванны, унитазы и трубы. Механическая и гидродинамическая прочистка.",
  },
  santehnik: {
    icon: Wrench,
    text: "Устранение протечек, установка и замена сантехники, подключение техники.",
  },
  elektrik: {
    icon: Zap,
    text: "Розетки, выключатели, электрощиты, освещение и электропроводка.",
  },
  ariston: {
    icon: Flame,
    text: "Диагностика, ремонт, замена ТЭНа и термостата, установка водонагревателей.",
  },
} satisfies Record<ServiceId, { icon: LucideIcon; text: string }>;

// Минимальная цена за работу (позиции «за пог. м» не учитываем)
function minPrice(id: ServiceId): string | null {
  const cat = priceCategories.find((c) => c.id === id);
  const values = (cat?.items ?? [])
    .filter((i) => i.unit !== "meter")
    .map((i) => i.from)
    .filter((v): v is number => v !== null);
  if (values.length === 0) return null;
  return formatPrice({ name: "", from: Math.min(...values) });
}

export function ServiceCategories() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Услуги"
        title="Выберите, что нужно сделать"
        description="Четыре направления: от засора до ремонта водонагревателя. Выезжаем в квартиры, дома и офисы."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCategories.map((s) => {
          const { icon: Icon, text } = meta[s.id];
          const price = minPrice(s.id);
          return (
            <li key={s.id} className="reveal">
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-primary text-white">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
                {price && (
                  <p className="mt-4 text-sm font-semibold text-primary">{price}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Подробнее
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}