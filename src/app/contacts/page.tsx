import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { OrderSection } from "@/components/sections/OrderSection";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Контакты: вызвать мастера в Бишкеке",
  description: `Телефон ${siteConfig.phone.display} и WhatsApp: вызов сантехника, электрика и мастера по прочистке засоров в Бишкеке. Работаем круглосуточно.`,
  alternates: { canonical: "/contacts/" },
};

interface Channel {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
  action: string;
  external?: boolean;
  primary?: boolean;
}

const channels: Channel[] = [
  {
    icon: Phone,
    title: "Телефон",
    value: siteConfig.phone.display,
    href: phoneHref,
    action: "Позвонить",
    primary: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Написать в чат",
    href: whatsappHref,
    action: "Открыть WhatsApp",
    external: true,
  },
  ...(siteConfig.telegramUsername
    ? [
        {
          icon: Send,
          title: "Telegram",
          value: `@${siteConfig.telegramUsername}`,
          href: `https://t.me/${siteConfig.telegramUsername}`,
          action: "Открыть Telegram",
          external: true,
        } satisfies Channel,
      ]
    : []),
];

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        crumb="Контакты"
        title="Контакты MasterPro.kg"
        lead="Позвоните или напишите в WhatsApp. Мы уточним проблему и согласуем стоимость до выезда мастера."
      />

      <Section>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ icon: Icon, title, value, href, action, external, primary }) => (
            <li key={title} className="rounded-2xl border border-line bg-white p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-white">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-1 text-base text-muted">{value}</p>
              <Button
                href={href}
                variant={primary ? "primary" : "outline"}
                size="md"
                className="mt-5 w-full"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {action}
              </Button>
            </li>
          ))}
        </ul>

        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          <li className="flex gap-4 rounded-2xl border border-line bg-white p-6">
            <Clock size={22} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold">График работы</h2>
              <p className="mt-1 text-muted">
                {siteConfig.schedule}. Принимаем заявки и выезжаем в том числе ночью и в выходные.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-2xl border border-line bg-white p-6">
            <MapPin size={22} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold">Зона выезда</h2>
              <p className="mt-1 text-muted">
                {siteConfig.area.text}. Не выезжаем: {siteConfig.area.notServed.join(", ")}.
              </p>
            </div>
          </li>
        </ul>
      </Section>

      <Section tone="white">
        <SectionHeading title="Какая услуга вам нужна" />
        <ul className="flex flex-wrap gap-3">
          {serviceCategories.map((s) => (
            <li key={s.id}>
              <Button href={s.href} variant="outline" size="md">
                {s.title}
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <OrderSection tone="surface" />
    </>
  );
}