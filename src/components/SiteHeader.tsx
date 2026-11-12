import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
      <Link href="/" className="font-bold tracking-tight">XVIIn</Link>
      <nav className="flex items-center gap-5 text-sm text-muted">
        <Link href="/#projects" className="hover:text-fg">{t("projects")}</Link>
        <Link href="/#contact" className="hover:text-fg">{t("contact")}</Link>
        <LanguageSwitch />
      </nav>
    </header>
  );
}
