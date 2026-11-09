import { MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";

export function OrderSection({ tone = "white" }: { tone?: "surface" | "white" }) {
  return (
    <Section id="order" tone={tone}>
      <div className="rounded-3xl bg-primary px-5 py-8 text-white sm:px-10 sm:py-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="mb-6 lg:mb-0">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Вызвать мастера</h2>
          <p className="mt-3 leading-relaxed text-white/85">
            Оставьте заявку: мы свяжемся с вами, уточним проблему и согласуем стоимость до
            выезда мастера. Работаем круглосуточно, 24/7.
          </p>
          <p className="mt-3 text-sm text-white/70">{siteConfig.area.text}</p>

          {/* На телефонах звонок и WhatsApp уже есть в нижней панели */}
          <div className="mt-6 hidden flex-col gap-3 sm:flex-row lg:flex">
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
              WhatsApp
            </Button>
          </div>
        </div>

        <LeadForm />
      </div>
    </Section>
  );
}