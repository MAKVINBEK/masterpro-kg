import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";

const colors = [
  { name: "Primary", hex: "#123B68", className: "bg-primary" },
  { name: "Accent", hex: "#F28C28", className: "bg-accent" },
  { name: "Surface", hex: "#F5F7FA", className: "bg-surface border border-line" },
  { name: "Ink", hex: "#1F2933", className: "bg-ink" },
  { name: "Muted", hex: "#52606D", className: "bg-muted" },
];

export default function DesignPreviewPage() {
  return (
    <main>
      <Section tone="white">
        <Container className="px-0 sm:px-0 lg:px-0">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Сантехник, электрик и прочистка засоров в Бишкеке
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Это временная страница для проверки дизайн-системы {siteConfig.name}.
            Кириллица, цвета и кнопки должны выглядеть аккуратно и на телефоне, и на компьютере.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={phoneHref}>
              <Phone size={20} aria-hidden="true" />
              Позвонить
            </Button>
            <Button
              href={whatsappHref}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp
            </Button>
            <Button href="#colors" variant="secondary">
              К палитре
            </Button>
          </div>
        </Container>
      </Section>

      <Section id="colors">
        <SectionHeading
          eyebrow="Палитра"
          title="Цвета бренда"
          description="Оранжевый используем только для кнопок и важных действий."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colors.map((c) => (
            <div key={c.name} className="rounded-2xl bg-white p-3 shadow-sm">
              <div className={`h-20 rounded-xl ${c.className}`} />
              <p className="mt-3 font-semibold">{c.name}</p>
              <p className="text-sm text-muted">{c.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Типографика" title="Заголовки и текст" />
        <h3 className="text-xl font-bold">Заголовок третьего уровня</h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed">
          Основной текст: мастер приезжает в удобное время, согласовывает стоимость
          до начала работ и выполняет их аккуратно. Съешь ещё этих мягких французских булок.
        </p>
      </Section>
    </main>
  );
}