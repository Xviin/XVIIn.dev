import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-2 text-4xl font-bold">{t("title")}</h1>
      <Link href="/" className="mt-6 text-muted hover:text-fg">← {t("home")}</Link>
    </main>
  );
}
