import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { popularServices } from "@/data/popular";
import { PRICE_DISCLAIMER, formatPrice } from "@/data/prices";

export function PopularServices() {
  return (
    <Section tone="white" id="popular">
      <SectionHeading
        eyebrow="Популярные услуги"
        title="Частые работы и ориентировочные цены"
        description="Полный список работ и цен собран на отдельной странице."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {popularServices.map(({ category, categoryTitle, item }) => (
          <li
            key={`${category}-${item.name}`}
            className="reveal flex flex-col rounded-2xl border border-line bg-surface p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {categoryTitle}
            </p>
            <h3 className="mt-2 text-lg font-bold leading-snug">{item.name}</h3>
            <div className="mt-auto pt-4">
              <p className="text-xl font-extrabold text-primary">{formatPrice(item)}</p>
              <Button
                href="#order"
                variant="outline"
                size="md"
                className="mt-4 w-full"
                aria-label={`Заказать: ${item.name}`}
              >
                Заказать
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
        {PRICE_DISCLAIMER}
      </p>
      <div className="mt-6">
        <Button href="/prices/" variant="secondary">
          Все цены
        </Button>
      </div>
    </Section>
  );
}