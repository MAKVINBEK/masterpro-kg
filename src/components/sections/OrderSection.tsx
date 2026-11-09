import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";

// Позже (этап 8) здесь появится форма заявки.
export function OrderSection({ tone = "white" }: { tone?: "surface" | "white" }) {
  return (
    <Section id="order" tone={tone}>
      <div className="rounded-3xl bg-primary px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Вызвать мастера</h2>
          <p className="mt-3 leading-relaxed text-white/85">
            Позвоните или напишите в WhatsApp. Мы уточним проблему, согласуем стоимость
            и отправим мастера. Работаем круглосуточно, 24/7.
          </p>
          <p className="mt-3 text-sm text-white/70">{siteConfig.area.text}</p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
          <Button href={phoneHref}>
            <Phone size={20} aria-hidden="true" />
            {siteConfig.phone.display}
          </Button>
          <Button
            href={whatsappHref}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Написать в WhatsApp
          </Button>
        </div>
      </div>
    </Section>
  );
}