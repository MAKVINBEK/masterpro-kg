export interface Review {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Дата публикации в формате ГГГГ-ММ-ДД */
  date: string;
}

// Пока массив пуст, блок отзывов на сайте скрыт.
// Одобренный вами отзыв добавляется сюда, затем git push, и Vercel обновит сайт:
//
//   { name: "Азамат", rating: 5, text: "Текст отзыва", date: "2026-11-09" },
//
// Добавляйте только настоящие отзывы клиентов.
export const reviews: Review[] = [];