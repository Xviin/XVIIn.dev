import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col justify-center px-4 sm:px-6">
      <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl">XVIIn</h1>
      <div className="mt-6 h-px w-full max-w-xl bg-line" />
      <p className="mt-6 max-w-xl text-lg text-muted">{t("tagline")}</p>
    </section>
  );
}
