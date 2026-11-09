import { DevNote } from "@/components/ui/DevNote";
import { Section, SectionHeading } from "@/components/ui/Section";
import { galleryItems } from "@/data/gallery";
import { isDev } from "@/lib/dev";
import { GalleryGrid, type GalleryCard } from "./GalleryGrid";

const devPlaceholders: GalleryCard[] = Array.from({ length: 6 }, () => ({
  title: "Название выполненной работы",
  description: "Краткое описание работы. Это заглушка для предпросмотра.",
  image: null,
}));

export function Gallery() {
  const usingPlaceholders = galleryItems.length === 0 && isDev;
  const items: GalleryCard[] = galleryItems.length > 0 ? galleryItems : usingPlaceholders ? devPlaceholders : [];

  if (items.length === 0) return null;

  return (
    <Section tone="white" id="gallery">
      <SectionHeading
        eyebrow="Галерея"
        title="Примеры выполненных работ"
        description="Нажмите на фотографию, чтобы рассмотреть её крупнее."
      />
      {usingPlaceholders && (
        <DevNote>блок скрыт на сайте, пока в src/data/gallery.ts нет реальных работ.</DevNote>
      )}
      <GalleryGrid items={items} />
    </Section>
  );
}