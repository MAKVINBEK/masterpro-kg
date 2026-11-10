import { ArrowRight, Clock, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";
import { heroImage } from "@/data/media";
import { serviceCategories } from "@/data/services";

const badge =
  "inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5";

export function Hero() {
  const { clogsDays, standardDays } = siteConfig.warranty;

  return (
    <section className="bg-white">
      <Container className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <ul className="mb-5 flex flex-wrap gap-2 text-sm font-semibold text-primary">
            <li className={badge}>
              <Clock size={16} aria-hidden="true" />
              Круглосуточно, 24/7
            </li>
            <li className={badge}>
              <ShieldCheck size={16} aria-hidden="true" />
              Гарантия {clogsDays}–{standardDays} дней
            </li>
            <li className={badge}>
              <MapPin size={16} aria-hidden="true" />
              Бишкек
            </li>
          </ul>

          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Сантехник, электрик и прочистка засоров в Бишкеке
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Выезжаем на дом, в офис и коммерческие помещения. Ремонт и установка
            водонагревателей Ariston. Стоимость согласуем до начала работ.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#order">Вызвать мастера</Button>
            <Button href={phoneHref} variant="outline">
              <Phone size={20} aria-hidden="true" />
              Позвонить
            </Button>
          </div>
        </div>

        {heroImage ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="hidden rounded-3xl bg-primary p-8 text-white lg:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Вызов мастера
            </p>
            <a
              href={phoneHref}
              className="mt-2 block text-3xl font-extrabold transition-colors hover:text-accent"
            >
              {siteConfig.phone.display}
            </a>
            <p className="mt-2 text-white/80">
              {siteConfig.schedule}. {siteConfig.area.text}.
            </p>

            <ul className="mt-6 space-y-2">
              {serviceCategories.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    className="flex min-h-12 items-center justify-between rounded-xl bg-white/10 px-4 font-semibold transition-colors hover:bg-white/20"
                  >
                    {s.title}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Написать в WhatsApp
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}