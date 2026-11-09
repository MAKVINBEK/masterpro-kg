// Защита в памяти серверной функции. Работает в пределах одного экземпляра,
// поэтому это «разумный минимум», а не абсолютная гарантия.

const hits = new Map<string, number[]>();

/** true, если запрос разрешён; false, если лимит исчерпан */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}

const inflight = new Set<string>();
const done = new Map<string, number>(); // ключ -> время, до которого помним

export type ClaimResult = "claimed" | "done" | "busy";

export function claim(key: string): ClaimResult {
  const now = Date.now();
  for (const [k, expires] of done) {
    if (expires <= now) done.delete(k);
  }
  if (done.has(key)) return "done";
  if (inflight.has(key)) return "busy";
  inflight.add(key);
  return "claimed";
}

export function complete(key: string, ttlMs: number) {
  inflight.delete(key);
  done.set(key, Date.now() + ttlMs);
}

export function release(key: string) {
  inflight.delete(key);
}