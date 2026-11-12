import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Locale = "en" | "tr";
export type ProjectStatus = "live" | "soon" | "wip";

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  kind: string;
  year: number;
  status: ProjectStatus;
  order: number;
  links?: { label: string; url: string }[];
  cover?: string;
  locale: Locale;
  isFallback: boolean;
};

const DEFAULT_DIR = path.join(process.cwd(), "content/projects");
const REQUIRED = ["title", "tagline", "kind", "year", "status", "order"] as const;
const STATUSES: ProjectStatus[] = ["live", "soon", "wip"];
const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;
const LOCALES: readonly string[] = ["en", "tr"];

async function exists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function readProject(slug: string, locale: Locale, dir: string) {
  if (!SLUG_RE.test(slug) || !LOCALES.includes(locale)) return null;
  let file = path.join(dir, slug, `${locale}.mdx`);
  let usedLocale: Locale = locale;
  if (!(await exists(file))) {
    file = path.join(dir, slug, "en.mdx");
    usedLocale = "en";
    if (!(await exists(file))) return null;
  }
  const { data, content } = matter(await fs.readFile(file, "utf8"));
  const rel = `${slug}/${usedLocale}.mdx`;
  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      throw new Error(`Project file ${rel}: missing required field "${key}"`);
    }
  }
  if (!STATUSES.includes(data.status)) {
    throw new Error(`Project file ${rel}: status must be one of ${STATUSES.join(", ")}`);
  }
  const meta: ProjectMeta = {
    slug,
    title: String(data.title),
    tagline: String(data.tagline),
    kind: String(data.kind),
    year: Number(data.year),
    status: data.status,
    order: Number(data.order),
    links: Array.isArray(data.links) ? data.links : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    locale: usedLocale,
    isFallback: usedLocale !== locale,
  };
  return { meta, body: content };
}

export async function getProject(
  slug: string,
  locale: Locale,
  dir: string = DEFAULT_DIR,
): Promise<{ meta: ProjectMeta; body: string } | null> {
  return readProject(slug, locale, dir);
}

export async function getAllProjects(locale: Locale, dir: string = DEFAULT_DIR): Promise<ProjectMeta[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const projects = await Promise.all(entries.map((slug) => readProject(slug, locale, dir)));
  return projects
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => a.order - b.order);
}
