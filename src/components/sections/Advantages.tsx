import { BadgeCheck, Clock, Hammer, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export function Advantages() {
    const { clogsDays, standardDays, aristonDays } = siteConfig.warranty;

  const items = [
    {
      icon: Clock,
      title: "Круглосуточный выезд",
      text: "Принимаем заявки и выезжаем 24/7, в том числе ночью и в выходные.",
    },
    {
      icon: BadgeCheck,
      title: "Опытные мастера",
      text: "Работаем с засорами, сантехникой, электрикой и водонагревателями.",
    },
    {
      icon: Hammer,
      title: "Профессиональные инструменты",
      text: "Механическая и гидродинамическая прочистка, диагностика и монтаж с подходящим оборудованием.",
    },
    {
      icon: Wallet,
      title: "Честная стоимость",
      text: "Цены на работы указаны на сайте. Стоимость согласуем до начала работ, материалы и запчасти считаются отдельно.",
    },
    {
      icon: ShieldCheck,
      title: "Гарантия на работы",
      text: `${clogsDays} дней на устранение засоров, ${standardDays} дней на стандартные сантехнические и электромонтажные работы, ${aristonDays} дней на ремонт водонагревателей.`, 
    },
    {
      icon: Sparkles,
      title: "Аккуратная работа",
      text: "Работаем аккуратно в квартирах, частных домах и офисах.",
    },
  ];

  return (
    <Section id="advantages">
      <SectionHeading eyebrow="Почему мы" title="Что вы получаете, вызывая мастера MasterPro.kg" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="reveal rounded-2xl border border-line bg-white p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
