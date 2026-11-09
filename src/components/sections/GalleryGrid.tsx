"use client";

import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface GalleryCard {
  title: string;
  description: string;
  image: { src: string; alt: string } | null;
}

export function GalleryGrid({ items }: { items: GalleryCard[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const content = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
                {item.image ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-primary/30">
                    <ImageIcon size={40} aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="p-5 text-left">
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </>
          );

          const cardClass =
            "group block w-full overflow-hidden rounded-2xl border border-line bg-white shadow-sm";

          return (
            <li key={i} className="reveal">
              {item.image ? (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Открыть фото: ${item.title}`}
                  className={`${cardClass} cursor-zoom-in transition duration-200 hover:-translate-y-1 hover:shadow-md`}
                >
                  {content}
                </button>
              ) : (
                <div className={cardClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Не добавляйте display-классы (flex, grid) на dialog: они ломают скрытие закрытого окна */}
      <dialog
        ref={dialogRef}
        aria-label="Просмотр фотографии"
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/80"
      >
        {current?.image && (
          <div className="relative w-[min(92vw,960px)] overflow-hidden rounded-2xl bg-white">
            <div className="relative h-[65dvh] w-full bg-black">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="font-bold text-primary">{current.title}</p>
              <p className="mt-1 text-sm text-muted">{current.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Закрыть"
              className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white/90 text-primary transition-colors hover:bg-white"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}