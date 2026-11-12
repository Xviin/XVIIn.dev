# XVIIn.dev Site Skeleton — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A working, bilingual (EN primary, TR secondary), black-themed Next.js site with intro gate placeholder, home (hero, projects, links), per-project pages from content files, and a slot for custom per-project scenes — ready for Ege's intro design and project content.

**Architecture:** Next.js App Router with `[locale]` segment via next-intl (`/` = English, `/tr` = Turkish). Projects live as MDX files per locale under `content/projects/<slug>/`; a small loader reads frontmatter. Per-project custom scenes/demos register in a slug→component map so each project page can host its own interactive piece later. GSAP / Three.js are NOT installed in this plan (YAGNI) — they arrive with the intro/scene plans.

**Tech Stack:** Next.js (latest stable, App Router, TypeScript), Tailwind CSS, next-intl, gray-matter + next-mdx-remote (RSC), Vitest, Playwright, Vercel.

**Spec:** `docs/superpowers/specs/2026-11-13-xviin-dev-site-design.md`

## Global Constraints

- Black theme: page background `#000000`-near (`#050608`), primary text `#F5F6F8`.
- Languages: `en` default (no prefix), `tr` at `/tr`. Every user-visible string comes from `messages/en.json` / `messages/tr.json`.
- No real company data anywhere (panels appear only as fake-data demos, later plans).
- No Matrix/Tron styling. No visual flourishes beyond the black theme — visual language comes from Ege later.
- Adding a project = adding `content/projects/<slug>/en.mdx` (+ optional `tr.mdx`); no code changes.
- Respect `prefers-reduced-motion`; layout works at 375px wide with no horizontal scroll.
- Repo is public on GitHub; no secrets committed.

## Review Focus

1. Turkish characters (ı İ ş ğ ç ö ü) render in the chosen fonts on `/tr` — font subsets must include `latin-ext`. → Task 2 e2e asserts `/tr` contains "Projeler" and screenshot check by eye.
2. Unknown project slug or locale (`/projects/nope`, `/de`) returns the 404 page, never a crash. → Task 5 e2e.
3. Project with only `en.mdx` viewed on `/tr` falls back to English instead of 404. → Task 3 unit test.
4. Intro gate never traps a visitor: click, any key, or 6s timeout passes; with reduced motion or JS disabled, content is reachable. → Task 6 e2e.
5. Mobile 375px: no horizontal scroll on home and project page. → Task 4 & 5 e2e (`scrollWidth <= clientWidth`).

## Prerequisite (environment)

npm registry is blocked for this session's sandboxes. Before Task 1, Ege enables package manager access (claude.ai → Settings → Capabilities) **or** dependency installs run in Terminal on Ege's Mac. Work happens in a cloud workspace and is mirrored into `~/Documents/XVIIn.dev/site/`.

---

### Task 1: Scaffold project

**Files:**
- Create: `site/` via `npx create-next-app@latest site --ts --tailwind --app --src-dir --eslint --import-alias "@/*" --use-npm`
- Create: `site/vitest.config.ts`, `site/playwright.config.ts`, `site/e2e/smoke.spec.ts`
- Modify: `site/src/app/globals.css` (theme tokens), `site/src/app/layout.tsx`, `site/src/app/page.tsx` (minimal)

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `test` (vitest run), `e2e` (playwright test, webServer = `npm run build && npm start`, port 3000).
- Produces: CSS vars `--bg: #050608`, `--fg: #F5F6F8`, `--muted: #8A8F98`, `--line: #1C1F24`.

- [ ] **Step 1:** Run create-next-app as above; `git init` in `site/`; add `.gitignore` defaults.
- [ ] **Step 2:** Install dev deps `vitest @vitejs/plugin-react @playwright/test`; `npx playwright install chromium` (skip in sandbox where Chromium is preinstalled).
- [ ] **Step 3: Write failing e2e** `e2e/smoke.spec.ts`:
```ts
test('home has black background and XVIIn', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('XVIIn');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(5, 6, 8)');
});
```
- [ ] **Step 4:** Run `npm run e2e` → FAIL.
- [ ] **Step 5:** Set theme vars in `globals.css`, body uses them; `page.tsx` renders `<h1>XVIIn</h1>`.
- [ ] **Step 6:** Run `npm run e2e` → PASS; `npm run build` → success.
- [ ] **Step 7:** Commit `chore: scaffold Next.js site with black theme`.

### Task 2: Internationalization (EN default, TR)

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`, `messages/en.json`, `messages/tr.json`, `src/components/LanguageSwitch.tsx`, `e2e/i18n.spec.ts`
- Move: `src/app/page.tsx`, `layout.tsx` → `src/app/[locale]/...`

**Interfaces:**
- Produces: `routing = defineRouting({ locales: ['en','tr'], defaultLocale: 'en', localePrefix: 'as-needed' })`; `Link`, `usePathname`, `useRouter` re-exported from `src/i18n/navigation.ts`.
- Produces: message keys `nav.projects`, `nav.contact`, `hero.tagline`, `projects.title`, `contact.title`, `lang.switch`, `notFound.title`.
- Fonts: `next/font/google` with `subsets: ['latin', 'latin-ext']`.

- [ ] **Step 1: Write failing e2e** `e2e/i18n.spec.ts`: `/` shows `nav.projects` = "Projects"; `/tr` shows "Projeler" and `<html lang="tr">`; clicking LanguageSwitch on `/` navigates to `/tr` and back; `/de` → 404 status.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement next-intl setup, `[locale]` layout sets `lang`, `generateStaticParams` for both locales, LanguageSwitch keeps current path.
- [ ] **Step 4:** Run `npm run e2e` → PASS.
- [ ] **Step 5:** Commit `feat: bilingual routing (en default, tr)`.

### Task 3: Projects content layer

**Files:**
- Create: `src/lib/projects.ts`, `src/lib/projects.test.ts`, `content/projects/claff/en.mdx`, `content/projects/claff/tr.mdx`, `content/projects/mac-network-tool/en.mdx`, `src/lib/__fixtures__/projects/` (test fixtures)

**Interfaces:**
- Produces:
```ts
type ProjectStatus = 'live' | 'soon' | 'wip';
type ProjectMeta = {
  slug: string; title: string; tagline: string;
  kind: string;          // e.g. "iOS app", "macOS tool", "Panel"
  year: number; status: ProjectStatus; order: number;
  links?: { label: string; url: string }[];
  cover?: string;        // path under /public
  locale: 'en'|'tr'; isFallback: boolean;
};
getAllProjects(locale: 'en'|'tr', dir?: string): Promise<ProjectMeta[]>   // sorted by order asc
getProject(slug: string, locale: 'en'|'tr', dir?: string): Promise<{ meta: ProjectMeta; body: string } | null>
```
- Default `dir` = `process.cwd() + '/content/projects'`.

- [ ] **Step 1: Write failing tests** in `projects.test.ts` against fixtures (two projects, one with only `en.mdx`):
  - `getAllProjects('en')` returns 2, sorted by `order`.
  - `getProject('only-en','tr')` returns `meta.locale === 'en'`, `isFallback === true`.
  - `getProject('missing','en')` returns `null`.
  - missing required frontmatter field (`title`) throws an error naming the file.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement with `gray-matter` + `fs/promises`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Seed content: Claff (`kind: "iOS app"`, `year: 2026`, `status: soon`, `order: 1`, tagline placeholder "Bills & Payments — never miss a due date.") and mac-network-tool (`status: wip`, `order: 2`). Taglines are placeholders for Ege to replace.
- [ ] **Step 6:** Commit `feat: file-based project content with tr→en fallback`.

### Task 4: Home sections (hero, projects, links)

**Files:**
- Create: `src/content/site.ts`, `src/components/home/Hero.tsx`, `src/components/home/ProjectGrid.tsx`, `src/components/home/ProjectCard.tsx`, `src/components/home/Contact.tsx`, `src/components/SiteFooter.tsx`, `e2e/home.spec.ts`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `getAllProjects` (Task 3), `Link` (Task 2).
- Produces: `site.links: { id: 'github'|'linkedin'|'x'|'email'; label: string; url: string }[]` — URLs are placeholders `#` until Ege provides them; entries with `url === '#'` render but are marked `aria-disabled`.
- Card links to `/projects/<slug>` (locale-aware).

- [ ] **Step 1: Write failing e2e** `home.spec.ts`: home shows section headings `projects.title` and `contact.title`; a card titled "Claff" links to `/projects/claff` (and `/tr/projects/claff` on `/tr`); footer contains GitHub and LinkedIn links; at viewport 375×812 `document.documentElement.scrollWidth <= clientWidth`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement sections; cards show title, kind, year, status badge, tagline. Plain styling only.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: home with hero, project grid and links`.

### Task 5: Project detail page + scene slot

**Files:**
- Create: `src/app/[locale]/projects/[slug]/page.tsx`, `src/app/[locale]/not-found.tsx`, `src/components/projects/scenes.ts`, `src/components/projects/ProjectLayout.tsx`, `e2e/project.spec.ts`

**Interfaces:**
- Consumes: `getProject`, `getAllProjects` (Task 3).
- Produces: `scenes: Record<string, () => Promise<{ default: React.ComponentType }>>` — empty map now; a slug's entry, if present, is rendered (via `next/dynamic`, `ssr: false`) above the MDX body.
- `generateStaticParams` = every slug × both locales. `generateMetadata` sets title `"<title> — XVIIn"`.
- If `isFallback`, show a small note from messages key `project.fallbackNote`.

- [ ] **Step 1: Write failing e2e**: `/projects/claff` shows h1 "Claff" and tagline; `/tr/projects/mac-network-tool` (no tr file) shows English content + fallback note; `/projects/nope` → status 404 and `notFound.title`; 375px no horizontal scroll.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement page rendering MDX body with `next-mdx-remote/rsc`, back link to home, project links as buttons.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: per-project pages with scene slot`.

### Task 6: Intro gate (placeholder)

**Files:**
- Create: `src/components/intro/IntroGate.tsx`, `e2e/intro.spec.ts`
- Modify: `src/app/[locale]/page.tsx` (wrap home)

**Interfaces:**
- Produces: `<IntroGate>{children}</IntroGate>` — client component. Shows full-screen black overlay with "XVIIn", a thin line, and hint `intro.hint` ("click · skip" / "tıkla · geç"). Dismisses on click, any keypress, or after 6000 ms. Sets `sessionStorage['xviin:intro-seen']='1'` (wrapped in try/catch); not shown again in the same session.
- Content underneath is server-rendered and present in the DOM at all times (overlay only covers it) so no-JS visitors and crawlers see the site; with no JS the overlay is not rendered (overlay mounts client-side only).
- `prefers-reduced-motion: reduce` → no fade animation, overlay still dismissible.
- This is a placeholder; the real intro replaces the overlay's inner content in a later plan without changing the gate behaviour.

- [ ] **Step 1: Write failing e2e**: fresh context → overlay visible with "XVIIn"; click → overlay gone, hero visible; reload → overlay not shown; new context + `page.keyboard.press('Escape')` → gone; new context, wait 6.5s → gone; JS disabled context → hero visible.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: intro gate placeholder`.

### Task 7: Metadata and deploy

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `site/README.md` (how to add a project)
- Modify: `src/app/[locale]/layout.tsx` (metadata, `alternates.languages`)

- [ ] **Step 1:** Add metadata (title template `%s — XVIIn`, description placeholder), hreflang alternates en/tr, sitemap listing home + all project pages for both locales.
- [ ] **Step 2:** `npm run build` → success; `npm run e2e` → all PASS; `npm test` → PASS.
- [ ] **Step 3:** Commit `feat: metadata, sitemap, README`.
- [ ] **Step 4 (with Ege):** Create GitHub repo `xviin.dev` under Ege's account, push; import into Vercel; verify the preview URL loads `/` and `/tr`. Domain hookup when Ege confirms the domain.
