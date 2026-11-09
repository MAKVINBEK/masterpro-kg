import { Wrench } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
}

// Временный текстовый логотип. Когда будет готов графический,
// заменим содержимое Link на <Image />, остальное менять не нужно.
export function Logo({ tone = "dark", className }: LogoProps) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — на главную`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "grid size-9 place-items-center rounded-lg",
          light ? "bg-accent text-primary" : "bg-primary text-accent",
        )}
      >
        <Wrench size={20} aria-hidden="true" />
      </span>
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight",
          light ? "text-white" : "text-primary",
        )}
      >
        MasterPro<span className="text-accent">.kg</span>
      </span>
    </Link>
  );
}