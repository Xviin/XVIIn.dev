import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-6xl font-extrabold tracking-tight">XVIIn</h1>
    </main>
  );
}
