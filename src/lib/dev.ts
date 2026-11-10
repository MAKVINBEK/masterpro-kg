// true только при npm run dev. Нужен для предпросмотра блоков, которые на сайте скрыты.
// Заглушки предпросмотра (галерея, отзывы) видны только при npm run dev
// и только если в .env.local добавлена строка SHOW_PLACEHOLDERS=1.
export const isDev =
  process.env.NODE_ENV === "development" && process.env.SHOW_PLACEHOLDERS === "1";