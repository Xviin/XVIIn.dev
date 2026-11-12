export type SiteLink = { id: "github" | "linkedin" | "x" | "email"; label: string; url: string };

/** Ege fills in the real URLs. Entries with url "#" render as disabled. */
export const site = {
  name: "XVIIn",
  links: [
    { id: "github", label: "GitHub", url: "https://github.com/Xviin" },
    { id: "email", label: "Email", url: "mailto:xviin.clu@gmail.com" },
  ] satisfies SiteLink[],
};
