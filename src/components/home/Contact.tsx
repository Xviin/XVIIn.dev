import { getTranslations } from "next-intl/server";
import { SocialLinks } from "@/components/SocialLinks";

export async function Contact() {
  const t = await getTranslations("contact");
  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-20 sm:px-6">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted">{t("title")}</h2>
      <SocialLinks className="mt-8 text-2xl font-bold" />
    </section>
  );
}
