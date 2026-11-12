export type SiteLink = { id: "github" | "linkedin" | "x" | "email"; label: string; url: string };

/** Ege fills in the real URLs. Entries with url "#" render as disabled. */
export const site = {
  name: "XVIIn",
  links: [
    { id: "github", label: "GitHub", url: "https://github.com/Xviin" },
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/ege-men%C5%9Fan-ba3764244/" },
    { id: "email", label: "Email", url: "mailto:xviin.clu@gmail.com" },
  ] satisfies SiteLink[],
};
