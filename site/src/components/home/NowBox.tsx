import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ProjectMeta } from "@/lib/projects";
import { now } from "@/content/now";
import { Countdown } from "./Countdown";

/** Square "now" box: what Ege is building, its launch countdown, what's next. */
export async function NowBox({ projects }: { projects: ProjectMeta[] }) {
  const t = await getTranslations("now");
  const locale = await getLocale();
  const current = projects.find((p) => p.slug === now.slug);
  if (!current) return null;
  const next = "next" in now ? projects.find((p) => p.slug === now.next) : undefined;
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
      day: "numeric",
      month: "long",
      timeZone: "Europe/Istanbul",
    }).format(d);
  const launch = "launch" in now ? now.launch : undefined;
  const launchLabel = launch ? fmt(new Date(`${launch}T12:00:00+03:00`)) : "";
  const live = current.status === "live";

  return (
    <aside
      data-testid="now-box"
      aria-label={t("title")}
      className="flex flex-col rounded-2xl border border-line bg-[#0b0c0f] p-6 sm:p-8 lg:aspect-square"
    >
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
        {t("title")}
        <span aria-hidden className="inline-block h-3.5 w-2 animate-[intro-blink_1.1s_steps(1)_infinite] bg-[#F4ECD4]" />
      </div>

      <Link href={`/projects/${current.slug}`} className="group mt-8 flex items-center gap-4">
        {current.cover && (
          <Image src={current.cover} alt="" width={64} height={64} className="h-14 w-14 rounded-[22%]" />
        )}
        <div>
          <div className="font-mono text-xs text-muted">{t("building")}</div>
          <div className="text-2xl font-bold tracking-tight group-hover:underline">{current.title}</div>
        </div>
      </Link>

      <div className="mt-auto pt-10">
        {live || !launch ? (
          <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {live ? t("launched") : current.tagline}
          </div>
        ) : (
          <>
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">{t("launch")}</div>
            <Countdown date={launch} dateLabel={launchLabel} />
          </>
        )}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
        {next && (
          <div>
            <dt className="font-mono text-xs text-muted">{t("next")}</dt>
            <dd className="mt-1">
              <Link href={`/projects/${next.slug}`} className="hover:underline">
                {next.title}
              </Link>
            </dd>
          </div>
        )}
        <div>
          <dt className="font-mono text-xs text-muted">{t("updated")}</dt>
          <dd className="mt-1">{fmt(new Date())}</dd>
        </div>
      </dl>
    </aside>
  );
}
