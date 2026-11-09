export class TelegramError extends Error {
  constructor(public code: string) {
    super(code);
    this.name = "TelegramError";
  }
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new TelegramError("config_missing");

  let res: Response;
  try {
    res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
  } catch {
    // Не логируем сам объект ошибки: в нём может быть адрес с токеном
    throw new TelegramError("network");
  }

  if (!res.ok) throw new TelegramError(`api_${res.status}`);

  const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  if (!data?.ok) throw new TelegramError("api_not_ok");
}