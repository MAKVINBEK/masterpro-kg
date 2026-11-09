export interface MediaImage {
  src: string;
  alt: string;
}

// Фото для главного экрана. Пока null: вместо фото показывается панель с контактами.
// Когда будет фото, положите файл в public/images/ и замените строку ниже, например:
// export const heroImage: MediaImage | null = {
//   src: "/images/hero.jpg",
//   alt: "Мастер устанавливает смеситель на кухне",
// };
// Alt должен описывать то, что реально на фото.
export const heroImage: MediaImage | null = null;