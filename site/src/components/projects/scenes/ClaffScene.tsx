"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const SHOTS = [
  { src: "/projects/claff/list.webp", key: "list" },
  { src: "/projects/claff/calendar.webp", key: "calendar" },
  { src: "/projects/claff/paid.webp", key: "paid" },
  { src: "/projects/claff/widgets.webp", key: "widgets" },
  { src: "/projects/claff/widget-calendar.webp", key: "widgetCalendar" },
] as const;

/** Screenshot strip for Claff: swipe on phones, arrows or trackpad on desktop. */
export default function ClaffScene() {
  const t = useTranslations("claff");
  const row = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => row.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section aria-label={t("label")} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-72 max-w-xl rounded-full bg-[#2F5D50]/30 blur-3xl"
      />
      <ul
        ref={row}
        data-testid="claff-shots"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SHOTS.map((s) => (
          <li key={s.key} className="w-[230px] shrink-0 snap-start sm:w-[240px]">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-[#111214] shadow-2xl shadow-black/60">
              <Image src={s.src} alt={t(`shots.${s.key}`)} width={720} height={1564} className="h-auto w-full" />
            </div>
            <p className="mt-3 text-sm text-muted">{t(`shots.${s.key}`)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-2 hidden justify-end gap-2 sm:flex">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => scroll(d)}
            aria-label={t(d < 0 ? "prev" : "next")}
            className="grid h-9 w-9 place-items-center rounded-full border border-line font-mono text-sm text-muted hover:border-muted hover:text-fg"
          >
            {d < 0 ? "←" : "→"}
          </button>
        ))}
      </div>
    </section>
  );
}
