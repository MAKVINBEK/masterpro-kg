import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  crumb: string;
  path: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

export function PageHeader({ crumb, path, title, lead, children }: PageHeaderProps) {
  return (
    <section className="bg-white">
      <Container className="py-8 sm:py-12">
        <Breadcrumbs path={path} items={[{ label: crumb }]} />
        <h1 className="mt-6 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>
        )}
        {children}
      </Container>
    </section>
  );
}