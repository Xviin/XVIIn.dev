import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getAllProjects, getProject } from "@/lib/projects";
import { ProjectLayout } from "@/components/projects/ProjectLayout";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const all = await getAllProjects("en");
  return routing.locales.flatMap((locale) => all.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const project = await getProject(slug, locale);
  if (!project) return {};
  return {
    title: { absolute: `${project.meta.title} — XVIIn` },
    description: project.meta.tagline,
    alternates: {
      canonical: `${locale === "en" ? "" : `/${locale}`}/projects/${slug}`,
      languages: { en: `/projects/${slug}`, tr: `/tr/projects/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const project = await getProject(slug, locale);
  if (!project) notFound();
  return <ProjectLayout meta={project.meta} body={project.body} />;
}
