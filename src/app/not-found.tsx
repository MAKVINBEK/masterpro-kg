import type { Metadata } from "next";
import { OrderSection } from "@/components/sections/OrderSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

export default function NotFound() {
  return (
    <>
      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Ошибка 404
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Такой страницы нет
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Возможно, ссылка устарела или в адресе опечатка. Выберите нужную услугу
            или вернитесь на главную.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            <li>
              <Button href="/">На главную</Button>
            </li>
            {serviceCategories.map((s) => (
              <li key={s.id}>
                <Button href={s.href} variant="outline">
                  {s.title}
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <OrderSection tone="surface" />
    </>
  );
}