import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col justify-center px-4 sm:px-6">
      <h1 className="sr-only">XVIIn</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand-rozet.svg"
        alt=""
        aria-hidden="true"
        data-testid="hero-logo"
        width={560}
        height={280}
        className="w-full max-w-xl h-auto"
      />
      <p className="mt-6 max-w-xl text-lg text-muted">{t("tagline")}</p>
    </section>
  );
}
