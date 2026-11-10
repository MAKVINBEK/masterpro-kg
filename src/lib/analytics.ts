export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID) || 0;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

/** Отправляет достижение цели в Яндекс Метрику. Безопасно, если счётчик не подключён. */
export function reachGoal(goal: string) {
  if (!YM_ID || typeof window === "undefined" || typeof window.ym !== "function") return;
  window.ym(YM_ID, "reachGoal", goal);
}