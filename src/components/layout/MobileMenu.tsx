"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  items: { label: string; href: string }[];
  phoneHref: string;
  phoneLabel: string;
}

export function MobileMenu({ items, phoneHref, phoneLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white text-primary transition-colors hover:bg-primary/5"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white shadow-lg"
        >
          <nav
            aria-label="Мобильная навигация"
            className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6"
          >
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-line/70 text-base font-semibold text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 pb-2">
              <Button href="#order" onClick={() => setOpen(false)}>
                Вызвать мастера
              </Button>
              <a
                href={phoneHref}
                className="text-center text-base font-bold text-primary"
              >
                {phoneLabel}
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}