import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqItems, type FaqItem } from "@/data/faq";

interface FaqProps {
  items?: FaqItem[];
  title?: string;
  tone?: "surface" | "white";
}

export function Faq({
  items = faqItems,
  title = "Частые вопросы",
  tone = "white",
}: FaqProps) {
  return (
    <Section tone={tone} id="faq">
      <SectionHeading eyebrow="FAQ" title={title} />
      <div className="max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-line bg-surface"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-base font-bold text-primary [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                size={20}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}