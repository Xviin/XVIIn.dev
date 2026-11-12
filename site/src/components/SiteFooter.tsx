import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-auto flex w-full max-w-5xl flex-col gap-4 border-t border-line px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span className="font-mono text-muted">© {new Date().getFullYear()} XVIIn</span>
      <SocialLinks />
    </footer>
  );
}
