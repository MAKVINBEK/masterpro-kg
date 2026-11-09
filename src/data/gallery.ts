import type { MediaImage } from "@/data/media";

export interface GalleryItem {
  title: string;
  description: string;
  image: MediaImage;
}

// Пока массив пуст, блок «Галерея» на сайте скрыт.
// Чтобы добавить работу: положите фото в public/images/gallery/ и добавьте объект, например:
//
//   {
//     title: "Замена смесителя на кухне",
//     description: "Установили новый смеситель, проверили соединения на протечки.",
//     image: { src: "/images/gallery/smesitel-01.jpg", alt: "Новый смеситель на кухонной мойке" },
//   },
//
// Добавляйте только реальные работы и реальные фото.
export const galleryItems: GalleryItem[] = [];