import { setRequestLocale } from "next-intl/server";
import { getAllProjects, type Locale } from "@/lib/projects";
import { Hero } from "@/components/home/Hero";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { Contact } from "@/components/home/Contact";
import { IntroGate } from "@/components/intro/IntroGate";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getAllProjects(locale as Locale);
  return (
    <main className="flex flex-1 flex-col">
      <IntroGate />
      <Hero />
      <ProjectGrid projects={projects} />
      <Contact />
    </main>
  );
}
