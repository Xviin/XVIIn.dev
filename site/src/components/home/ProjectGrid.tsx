import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export async function ProjectGrid({ projects, aside }: { projects: ProjectMeta[]; aside?: ReactNode }) {
  const t = await getTranslations("projects");
  return (
    <section id="projects" className="mx-auto w-full max-w-[1800px] scroll-mt-20 px-4 pt-10 pb-20 sm:px-8 lg:px-12">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted">{t("title")}</h2>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)]">
        {aside && <div className="lg:order-2">{aside}</div>}
        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
