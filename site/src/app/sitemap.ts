import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/content/config";

const prefix = (locale: string) => (locale === "en" ? "" : `/${locale}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects("en");
  const paths = ["", ...projects.map((p) => `/projects/${p.slug}`)];
  return ["en", "tr"].flatMap((locale) =>
    paths.map((p) => ({ url: `${SITE_URL}${prefix(locale)}${p}` })),
  );
}
