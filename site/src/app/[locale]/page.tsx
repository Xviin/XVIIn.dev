import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { Contact } from "@/components/home/Contact";
import { NowBox } from "@/components/home/NowBox";
import { IntroGate } from "@/components/intro/IntroGate";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const projects = await getAllProjects(locale);
  return (
    <main className="flex flex-1 flex-col">
      <IntroGate />
      <h1 className="sr-only">XVIIn</h1>
      <ProjectGrid projects={projects} aside={<NowBox projects={projects} />} />
      <Contact />
    </main>
  );
}
