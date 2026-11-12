export type SiteLink = { id: "github" | "linkedin" | "x" | "email"; label: string; url: string };

/** Ege fills in the real URLs. Entries with url "#" render as disabled. */
export const site = {
  name: "XVIIn",
  links: [
    { id: "github", label: "GitHub", url: "#" },
    { id: "linkedin", label: "LinkedIn", url: "#" },
    { id: "x", label: "X", url: "#" },
    { id: "email", label: "Email", url: "#" },
  ] satisfies SiteLink[],
};
