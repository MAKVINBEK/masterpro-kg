export function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function readJsonBody(
  request: Request,
  maxChars: number,
): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; response: Response }> {
  try {
    const text = await request.text();
    if (text.length > maxChars) {
      return { ok: false, response: json({ ok: false, error: "too_large" }, 413) };
    }
    const parsed: unknown = JSON.parse(text);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return { ok: true, body: parsed as Record<string, unknown> };
    }
  } catch {
    // падаем ниже в общий ответ
  }
  return { ok: false, response: json({ ok: false, error: "bad_request" }, 400) };
}