import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ProjectMeta } from "@/lib/projects";

export async function ProjectCard({ project }: { project: ProjectMeta }) {
  const t = await getTranslations("projects.status");
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-line p-5 transition-colors hover:border-muted"
    >
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted">
        <span>{project.kind} · {project.year}</span>
        <span className="rounded-full border border-line px-2 py-0.5">{t(project.status)}</span>
      </div>
      <h3 className="mt-4 text-2xl font-bold tracking-tight">{project.title}</h3>
      <p className="mt-2 text-muted">{project.tagline}</p>
    </Link>
  );
}
