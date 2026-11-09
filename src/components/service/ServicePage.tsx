import {
  ArrowRight,
  Check,
  ClipboardList,
  Clock,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/sections/Faq";
import { OrderSection } from "@/components/sections/OrderSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { phoneHref, siteConfig } from "@/config/site";
import { PRICE_DISCLAIMER, formatPrice, priceCategories } from "@/data/prices";
import type { ServicePageContent } from "@/data/service-pages/types";
import { Phone } from "lucide-react";

export function ServicePage({ content }: { content: ServicePageContent }) {
  const category = priceCategories.find((c) => c.id === content.id);
  if (!category) {
    throw new Error(`Нет категории цен для страницы: ${content.id}`);
  }

  const minPrice = Math.min(
    ...category.items
      .filter((i) => i.unit !== "meter" && i.from !== null)
      .map((i) => i.from as number),
  );

  const facts = [
    { icon: Clock, text: siteConfig.schedule },
    { icon: ShieldCheck, text: `Гарантия ${content.warranty.days} дней на выполненные работы` },
    { icon: MapPin, text: siteConfig.area.text },
    { icon: Wallet, text: `Стоимость работ ${formatPrice({ name: "", from: minPrice })}` },
  ];

  const { hero } = content;

  return (
    <>
      <section className="bg-white">
        <Container className="py-8 sm:py-12 lg:py-16">
          <Breadcrumbs items={[{ label: content.breadcrumb }]} />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {hero.h1}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{hero.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#order">Вызвать мастера</Button>
                <Button href={phoneHref} variant="outline">
                  <Phone size={20} aria-hidden="true" />
                  Позвонить
                </Button>
              </div>
            </div>

            {hero.image ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <ul className="space-y-3 rounded-3xl bg-primary p-6 text-white sm:p-8">
                {facts.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 font-semibold">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading title={content.includes.title} />
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {content.includes.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <Check size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <SectionHeading title={content.situations.title} />
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.situations.items.map((item) => (
            <li
              key={item}
              className="reveal flex gap-3 rounded-xl bg-surface p-4 text-sm leading-relaxed"
            >
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading title={content.approach.title} description={content.approach.intro} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {content.approach.items.map((item) => (
            <li key={item.title} className="reveal rounded-2xl border border-line bg-white p-6">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" id="prices">
        <SectionHeading
          title={`Цены: ${category.title.toLowerCase()}`}
          description="Цены указаны за работу и являются ориентировочными."
        />
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">{`Ориентировочные цены: ${category.title}`}</caption>
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold sm:px-5">
                  Работа
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold sm:px-5">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {category.items.map((item) => (
                <tr key={item.name}>
                  <th scope="row" className="px-4 py-3 text-left font-medium sm:px-5">
                    {item.name}
                  </th>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-bold text-primary sm:px-5">
                    {formatPrice(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">{PRICE_DISCLAIMER}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="#order">Заказать</Button>
          <Button href="/prices/" variant="outline">
            Все цены
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="rounded-2xl border border-line bg-white p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-2xl font-extrabold">Гарантия на работы</h2>
            <p className="mt-3 leading-relaxed text-muted">{content.warranty.text}</p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-2xl font-extrabold">
              <ClipboardList size={24} aria-hidden="true" />
              {content.beforeArrival.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {content.beforeArrival.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Faq items={content.faq.items} title={content.faq.title} tone="white" />

      <Section>
        <SectionHeading title="Смотрите также" />
        <ul className="grid gap-4 md:grid-cols-3">
          {content.related.map((r) => (
            <li key={r.href} className="reveal">
              <Link
                href={r.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.text}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Перейти
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {content.note && (
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">{content.note}</p>
        )}
      </Section>

      <OrderSection />
    </>
  );
}