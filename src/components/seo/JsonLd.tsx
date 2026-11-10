export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Экранируем "<", чтобы текст не мог закрыть тег script
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}