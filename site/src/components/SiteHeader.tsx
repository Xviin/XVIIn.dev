import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
      <Link href="/" className="shrink-0" aria-label="XVIIn">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand-rozet.svg" alt="XVIIn" width={88} height={44} className="h-9 w-auto" />
      </Link>
      <nav className="flex items-center gap-5 text-sm text-muted">
        <Link href="/#projects" className="hover:text-fg">{t("projects")}</Link>
        <Link href="/#contact" className="hover:text-fg">{t("contact")}</Link>
        <LanguageSwitch />
      </nav>
    </header>
  );
}
