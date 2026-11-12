"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

/** Path for the same page in the other locale. English has no prefix, Turkish lives under /tr. */
export function otherLocaleHref(pathname: string, current: string): string {
  // During prerender the pathname includes the internal locale segment (/en/...), so strip either prefix.
  const bare = pathname.replace(/^\/(en|tr)(?=\/|$)/, "") || "/";
  if (current === "tr") return bare;
  return bare === "/" ? "/tr" : `/tr${bare}`;
}

export function LanguageSwitch() {
  const t = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname() ?? "/";

  return (
    <NextLink
      href={otherLocaleHref(pathname, locale)}
      data-testid="lang-switch"
      aria-label={t("label")}
      hrefLang={locale === "en" ? "tr" : "en"}
      className="font-mono text-xs tracking-widest text-muted hover:text-fg"
    >
      {t("switch")}
    </NextLink>
  );
}
