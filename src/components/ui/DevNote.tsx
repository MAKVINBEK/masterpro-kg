export function DevNote({ children }: { children: string }) {
  return (
    <p className="mb-6 rounded-lg border border-dashed border-accent bg-accent/10 px-3 py-2 text-sm text-primary">
      Предпросмотр: {children}
    </p>
  );
}