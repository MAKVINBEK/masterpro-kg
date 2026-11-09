import { Button } from "@/components/ui/Button";
import { DevNote } from "@/components/ui/DevNote";
import { Section, SectionHeading } from "@/components/ui/Section";
import { reviews, type Review } from "@/data/reviews";
import { isDev } from "@/lib/dev";
import { ReviewCard } from "./ReviewCard";

const devPlaceholders: Review[] = [1, 2, 3].map(() => ({
  name: "Имя клиента",
  rating: 5,
  text: "Здесь будет текст отзыва клиента. Это заглушка для предпросмотра.",
  date: "2026-11-09",
}));

export function Reviews() {
  const real = [...reviews].sort((a, b) => b.date.localeCompare(a.date));
  const usingPlaceholders = real.length === 0 && isDev;
  const items = real.length > 0 ? real.slice(0, 6) : usingPlaceholders ? devPlaceholders : [];

  if (items.length === 0) return null;

  return (
    <Section id="reviews">
      <SectionHeading eyebrow="Отзывы" title="Что говорят клиенты" />
      {usingPlaceholders && (
        <DevNote>блок скрыт на сайте, пока в src/data/reviews.ts нет реальных отзывов.</DevNote>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((review, i) => (
          <li key={`${review.name}-${review.date}-${i}`}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
      {real.length > 0 && (
        <div className="mt-8">
          <Button href="/reviews/" variant="outline">
            Все отзывы
          </Button>
        </div>
      )}
    </Section>
  );
}