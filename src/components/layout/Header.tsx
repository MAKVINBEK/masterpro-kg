import { Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navItems, phoneHref, siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Основная навигация" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary/80 transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={phoneHref}
            className="hidden items-center gap-2 font-bold text-primary xl:inline-flex"
          >
            <Phone size={18} aria-hidden="true" />
            {siteConfig.phone.display}
          </a>

          <div className="hidden xl:block">
            <Button href="#order" size="md">
              Вызвать мастера
            </Button>
          </div>

          <a
            href={phoneHref}
            aria-label={`Позвонить ${siteConfig.phone.display}`}
            className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors hover:bg-accent-hover xl:hidden"
          >
            <Phone size={20} aria-hidden="true" />
          </a>

          <MobileMenu
            items={navItems}
            phoneHref={phoneHref}
            phoneLabel={siteConfig.phone.display}
          />
        </div>
      </Container>
    </header>
  );
}