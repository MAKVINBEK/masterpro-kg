import type { Metadata } from "next";
import { ServicePage } from "@/components/service/ServicePage";
import { zasoryPage as content } from "@/data/service-pages/zasory";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: content.path },
};

export default function Page() {
  return <ServicePage content={content} />;
}