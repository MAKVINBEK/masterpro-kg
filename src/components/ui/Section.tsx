import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  tone?: "surface" | "white";
  className?: string;
  children: ReactNode;
}

export function Section({ id, tone = "surface", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-14 sm:py-20", tone === "white" ? "bg-white" : "bg-surface", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}