import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { phoneHref, siteConfig, whatsappHref } from "@/config/site";
import { serviceCategories } from "@/data/services";
import { Logo } from "./Logo";

const linkClass = "text-sm text-white/80 transition-colors hover:text-accent";
const headingClass = "mb-4 text-sm font-bold uppercase tracking-wide text-white";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h2 className={headingClass}>Услуги</h2>
          <ul className="space-y-3">
            {serviceCategories.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Информация</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/prices/" className={linkClass}>
                Цены
              </Link>
            </li>
            <li>
              <Link href="/reviews/" className={linkClass}>
                Отзывы
              </Link>
            </li>
            <li>
              <Link href="/contacts/" className={linkClass}>
                Контакты
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className={linkClass}>
                Политика конфиденциальности
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Контакты</h2>
          <ul className="space-y-3 text-sm text-white/80">
            <li>
              <a href={phoneHref} className="flex items-center gap-2 font-bold text-white hover:text-accent">
                <Phone size={16} aria-hidden="true" />
                {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} aria-hidden="true" />
              {siteConfig.schedule}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" />
              {siteConfig.area.text}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        {/* pb-24 на мобильных, чтобы нижняя панель не закрывала текст */}
        <Container className="flex flex-col gap-2 pt-5 pb-24 text-sm text-white/70 sm:flex-row sm:justify-between lg:pb-5">
          <p>© {siteConfig.name}. Все права защищены.</p>
          <Link href="/privacy/" className="hover:text-accent">
            Политика конфиденциальности
          </Link>
        </Container>
      </div>
    </footer>
  );
}