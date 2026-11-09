import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";

export function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="reveal flex h-full flex-col rounded-2xl border border-line bg-white p-6">
      <div
        role="img"
        aria-label={`Оценка ${review.rating} из 5`}
        className="flex gap-0.5 text-accent"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={18}
            aria-hidden="true"
            className={n <= review.rating ? "fill-current" : "text-line"}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed">{review.text}</blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-bold text-primary">{review.name}</span>
        <time dateTime={review.date} className="block text-muted">
          {formatReviewDate(review.date)}
        </time>
      </figcaption>
    </figure>
  );
}