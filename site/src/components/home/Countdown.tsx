"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/** Whole days from today (Istanbul) until `date` (YYYY-MM-DD). */
export function daysUntil(date: string, today: Date = new Date()): number {
  const ist = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(today);
  const a = Date.UTC(+ist.slice(0, 4), +ist.slice(5, 7) - 1, +ist.slice(8, 10));
  const b = Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10));
  return Math.round((b - a) / 86_400_000);
}

/**
 * Big launch countdown. The server HTML shows the date itself (the page is static);
 * the browser swaps in the live day count.
 */
export function Countdown({ date, dateLabel }: { date: string; dateLabel: string }) {
  const t = useTranslations("now");
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setDays(daysUntil(date));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [date]);

  if (days === null) {
    return <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">{dateLabel}</div>;
  }
  if (days < 0) {
    return <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">{t("launched")}</div>;
  }
  if (days <= 1) {
    return (
      <div data-testid="countdown" className="text-7xl font-extrabold tracking-tight sm:text-8xl">
        {t(days === 0 ? "today" : "tomorrow")}
      </div>
    );
  }
  return (
    <div data-testid="countdown" className="flex items-baseline gap-3">
      <span className="text-8xl font-extrabold tabular-nums tracking-tight sm:text-9xl">{String(days).padStart(2, "0")}</span>
      <span className="text-2xl font-bold text-muted">{t("days", { n: days })}</span>
    </div>
  );
}
