import type { Metadata } from "next";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { OrderSection } from "@/components/sections/OrderSection";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { reviews } from "@/data/reviews";

const sorted = [...reviews].sort((a, b) => b.date.localeCompare(a.date));
const empty = sorted.length === 0;

export const metadata: Metadata = {
  title: "Отзывы клиентов о работе мастеров в Бишкеке",
  description:
    "Отзывы клиентов MasterPro.kg о работе мастеров в Бишкеке. Все отзывы публикуются после проверки.",
  alternates: { canonical: "/reviews/" },
  // Пока отзывов нет, страницу не индексируем: пустая страница вредит SEO
  ...(empty && { robots: { index: false, follow: true } }),
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        crumb="Отзывы"
        title="Отзывы клиентов MasterPro.kg"
        lead="Все отзывы публикуются после проверки."
      />

      <Section>
        {empty ? (
          <div className="rounded-2xl border border-line bg-white p-8 text-center">
            <p className="text-lg font-bold text-primary">
              Пока здесь нет опубликованных отзывов
            </p>
            <p className="mx-auto mt-2 max-w-xl text-muted">
              Мы публикуем только настоящие отзывы клиентов и не заполняем страницу
              выдуманными. Если вы уже обращались к нам, оставьте отзыв в форме ниже.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((review, i) => (
              <li key={`${review.name}-${review.date}-${i}`}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section tone="white" id="leave-review">
        <SectionHeading
          title="Оставить отзыв"
          description="Расскажите, как прошла работа мастера. Отзыв появится на сайте после проверки."
        />
        <div className="max-w-xl">
          <ReviewForm />
        </div>
      </Section>

      <OrderSection tone="surface" />
    </>
  );
}