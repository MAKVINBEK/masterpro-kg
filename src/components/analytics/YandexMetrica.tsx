"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { YM_ID, reachGoal } from "@/lib/analytics";

export function YandexMetrica() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // Просмотры при переходах между страницами: в Next.js страница при этом не перезагружается.
  // Первый просмотр счётчик отправляет сам при инициализации.
  useEffect(() => {
    if (!YM_ID) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.ym?.(YM_ID, "hit", window.location.href);
  }, [pathname]);

  // Цели: нажатия на звонок и WhatsApp (один обработчик на весь сайт)
  useEffect(() => {
    if (!YM_ID) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) reachGoal("call_click");
      else if (href.startsWith("https://wa.me/")) reachGoal("whatsapp_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!YM_ID) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${YM_ID}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:false});`}
    </Script>
  );
}