import { getTranslations } from "next-intl/server";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export async function ProjectGrid({ projects }: { projects: ProjectMeta[] }) {
  const t = await getTranslations("projects");
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-20 sm:px-6">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted">{t("title")}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
