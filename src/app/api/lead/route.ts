import { siteConfig } from "@/config/site";
import { normalizePath, pageSources } from "@/data/sources";
import { claim, complete, rateLimit, release } from "@/lib/antispam";
import { TelegramError, escapeHtml, sendTelegramMessage } from "@/lib/telegram";
import { serviceOptions, validateLead } from "@/lib/validation";

const MAX_BODY_CHARS = 8_000;
const MIN_FILL_MS = 2_500;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const DEDUPE_MS = 5 * 60 * 1000;

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  let body: Record<string, unknown> = {};
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_CHARS) {
      return json({ ok: false, error: "too_large" }, 413);
    }
    const parsed: unknown = JSON.parse(text);
    if (parsed && typeof parsed === "object") body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Ловушка для ботов: настоящие пользователи это поле не видят
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true });
  }

  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS) {
    return json({ ok: false, error: "too_fast" }, 429);
  }

  if (!rateLimit(`lead:${clientIp(request)}`, RATE_LIMIT.limit, RATE_LIMIT.windowMs)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const result = validateLead(body);
  if (!result.ok) {
    return json({ ok: false, error: "validation", fields: result.errors }, 400);
  }
  const { name, phone, service, message } = result.data;

  // Защита от повторной отправки
  const keys = [`content:${phone}|${service}|${message}`];
  const id = body.submissionId;
  if (typeof id === "string" && /^[A-Za-z0-9-]{4,64}$/.test(id)) {
    keys.push(`id:${id}`);
  }

  const claimed: string[] = [];
  for (const key of keys) {
    const state = claim(key);
    if (state === "claimed") {
      claimed.push(key);
      continue;
    }
    claimed.forEach(release);
    if (state === "done") return json({ ok: true, duplicate: true });
    return json({ ok: false, error: "busy" }, 409);
  }

  const serviceLabel = serviceOptions.find((o) => o.value === service)?.label ?? service;
  const path = typeof body.path === "string" ? normalizePath(body.path) : "";
  const sourceLabel = pageSources[path]?.label ?? "Другая страница";
  const dateTime = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Bishkek",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  const text = [
    `<b>НОВАЯ ЗАЯВКА — ${escapeHtml(siteConfig.name.toUpperCase())}</b>`,
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Услуга:</b> ${escapeHtml(serviceLabel)}`,
    `<b>Проблема:</b> ${message ? escapeHtml(message) : "не указана"}`,
    `<b>Источник:</b> ${escapeHtml(sourceLabel)}`,
    `<b>Дата и время:</b> ${escapeHtml(dateTime)} (Бишкек)`,
  ].join("\n");

  try {
    await sendTelegramMessage(text);
    claimed.forEach((key) => complete(key, DEDUPE_MS));
    return json({ ok: true });
  } catch (error) {
    claimed.forEach(release);
    // В лог пишем только код ошибки, без персональных данных и без токена
    console.error("[lead] telegram failed:", error instanceof TelegramError ? error.code : "unknown");
    return json({ ok: false, error: "telegram" }, 502);
  }
}