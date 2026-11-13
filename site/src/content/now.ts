/**
 * "Now" box on the home page. Edit this when what you're working on changes.
 * - slug: the project being built right now (must exist in content/projects)
 * - launch: its release day (YYYY-MM-DD, Istanbul time) — drives the countdown; remove when unknown
 * - next: the project that comes after it (optional)
 */
export const now = {
  slug: "claff",
  launch: "2026-11-16",
  next: "mac-network-tool",
} as const satisfies { slug: string; launch?: string; next?: string };
