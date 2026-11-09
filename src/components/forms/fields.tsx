import type { ReactNode } from "react";

export function inputClass(hasError: boolean) {
  return [
    "min-h-12 w-full rounded-xl border bg-white px-4 text-base text-ink",
    "placeholder:text-muted/70 focus:outline-2 focus:outline-offset-1 focus:outline-primary",
    hasError ? "border-red-600" : "border-line",
  ].join(" ");
}

export function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}