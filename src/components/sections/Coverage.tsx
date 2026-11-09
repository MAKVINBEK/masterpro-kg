import { Check, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";

export function Coverage() {
  return (
    <Section id="coverage">
      <SectionHeading
        eyebrow="География"
        title="Где мы работаем"
        description="Выезжаем по Бишкеку и ближайшим пригородам."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="flex items-center gap-2 font-bold text-primary">
            <Check size={20} aria-hidden="true" />
            Выезжаем
          </p>
          <p className="mt-3 text-base">{siteConfig.area.text}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="flex items-center gap-2 font-bold text-primary">
            <X size={20} aria-hidden="true" />
            Не выезжаем
          </p>
          <p className="mt-3 text-base">{siteConfig.area.notServed.join(", ")}</p>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-sm text-muted">
        Не уверены, входит ли ваш адрес в зону выезда? Позвоните или напишите, и мы уточним.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button href={phoneHref} size="md">
          <Phone size={18} aria-hidden="true" />
          Позвонить
        </Button>
        <Button
          href={whatsappHref}
          variant="outline"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </Button>
      </div>
    </Section>
  );
}