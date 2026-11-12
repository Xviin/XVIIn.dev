import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import type { ProjectMeta } from "@/lib/projects";
import { SceneSlot } from "./SceneSlot";

export async function ProjectLayout({ meta, body }: { meta: ProjectMeta; body: string }) {
  const t = await getTranslations("project");
  const ts = await getTranslations("projects.status");
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/#projects" className="font-mono text-xs text-muted hover:text-fg">← {t("back")}</Link>
      {meta.isFallback && (
        <p className="mt-6 rounded-lg border border-line px-4 py-3 text-sm text-muted">{t("fallbackNote")}</p>
      )}
      <div className="mt-10 font-mono text-xs text-muted">
        {meta.kind} · {meta.year} · {ts(meta.status)}
      </div>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight sm:text-7xl">{meta.title}</h1>
      <p className="mt-4 text-xl text-muted">{meta.tagline}</p>
      {meta.links && meta.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {meta.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-4 py-2 text-sm hover:border-muted"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
      <SceneSlot slug={meta.slug} />
      <div className="prose-xviin mt-12 space-y-4 leading-relaxed text-fg/90">
        <MDXRemote source={body} />
      </div>
    </article>
  );
}
