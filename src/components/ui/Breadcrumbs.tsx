import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, path }: { items: Crumb[]; path: string }) {
  const all: Crumb[] = [{ label: "Главная", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(all.map((c) => ({ name: c.label, path: c.href ?? path })))}
      />
      <nav aria-label="Хлебные крошки">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {item.href && !last ? (
                  <Link href={item.href} className="hover:text-primary hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-primary">
                    {item.label}
                  </span>
                )}
                {!last && <ChevronRight size={14} aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}