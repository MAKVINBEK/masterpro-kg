import { siteConfig } from "@/config/site";
import { claim, complete, rateLimit, release } from "@/lib/antispam";
import { clientIp, json, originAllowed, readJsonBody } from "@/lib/http";
import { TelegramError, escapeHtml, sendTelegramMessage } from "@/lib/telegram";
import { validateReview } from "@/lib/validation";

const MAX_BODY_CHARS = 8_000;
const MIN_FILL_MS = 4_000;
const RATE_LIMIT = { limit: 3, windowMs: 30 * 60 * 1000 };
const DEDUPE_MS = 24 * 60 * 60 * 1000;
const TELEGRAM_LIMIT = 4_000;

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  const parsed = await readJsonBody(request, MAX_BODY_CHARS);
  if (!parsed.ok) return parsed.response;
  const body = parsed.body;

  // Ловушка для ботов: настоящие пользователи это поле не видят
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true });
  }

  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS) {
    return json({ ok: false, error: "too_fast" }, 429);
  }

  if (!rateLimit(`review:${clientIp(request)}`, RATE_LIMIT.limit, RATE_LIMIT.windowMs)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const result = validateReview(body);
  if (!result.ok) {
    return json({ ok: false, error: "validation", fields: result.errors }, 400);
  }
  const { name, rating, text } = result.data;

  // Дата публикации по времени Бишкека в формате ГГГГ-ММ-ДД
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bishkek" }).format(new Date());
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  // Готовый блок для вставки в src/data/reviews.ts
  const entry = [
    "  {",
    `    name: ${JSON.stringify(name)},`,
    `    rating: ${rating},`,
    `    text: ${JSON.stringify(text)},`,
    `    date: ${JSON.stringify(date)},`,
    "  },",
  ].join("\n");

  const message = [
    `<b>НОВЫЙ ОТЗЫВ — ${escapeHtml(siteConfig.name.toUpperCase())}</b>`,
    "<i>Ожидает вашего решения. На сайте пока не опубликован.</i>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Оценка:</b> ${stars} (${rating} из 5)`,
    `<b>Дата:</b> ${date}`,
    "",
    "<b>Опубликовать:</b> вставьте блок ниже в массив в src/data/reviews.ts и сделайте git push.",
    "<b>Отклонить:</b> ничего не делайте.",
    "",
    `<pre>${escapeHtml(entry)}</pre>`,
  ].join("\n");

  // Защита от слишком длинного сообщения (лимит Telegram — 4096 символов)
  if (message.length > TELEGRAM_LIMIT) {
    return json(
      { ok: false, error: "validation", fields: { text: "Сократите текст отзыва" } },
      400,
    );
  }

  // Защита от повторной отправки
  const keys = [`review:${name}|${text}`];
  const id = body.submissionId;
  if (typeof id === "string" && /^[A-Za-z0-9-]{4,64}$/.test(id)) {
    keys.push(`review-id:${id}`);
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

  try {
    await sendTelegramMessage(message);
    claimed.forEach((key) => complete(key, DEDUPE_MS));
    return json({ ok: true });
  } catch (error) {
    claimed.forEach(release);
    console.error(
      "[review] telegram failed:",
      error instanceof TelegramError ? error.code : "unknown",
    );
    return json({ ok: false, error: "telegram" }, 502);
  }
}