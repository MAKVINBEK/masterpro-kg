import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function HowWeWork() {
  const { clogsDays, standardDays } = siteConfig.warranty;

  const steps = [
    {
      title: "Вы оставляете заявку",
      text: "Позвоните, напишите в WhatsApp или заполните форму на сайте.",
    },
    {
      title: "Мы уточняем проблему",
      text: "Связываемся с вами и выясняем, что случилось и какие работы нужны.",
    },
    {
      title: "Согласовываем стоимость",
      text: "Называем ориентировочную цену работ до выезда мастера.",
    },
    {
      title: "Мастер приезжает",
      text: "Выезжаем по вашему адресу в Бишкеке и ближайших пригородах.",
    },
    {
      title: "Выполняет работу",
      text: `Гарантия на работы: ${clogsDays} или ${standardDays} дней в зависимости от вида работ.`,
    },
  ];

  return (
    <section id="how-we-work" className="bg-primary py-14 text-white sm:py-20">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/70">
            Как мы работаем
          </p>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            От заявки до готовой работы за пять шагов
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.title} className="reveal">
              <span className="grid size-11 place-items-center rounded-full bg-accent text-lg font-extrabold text-primary">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}