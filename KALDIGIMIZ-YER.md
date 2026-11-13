# XVIIn.dev — Kaldığımız yer

_Son güncelleme: 13 Kasım 2026 (giriş ekranı eklendi)_

Yeni bir sohbette Claude'a şunu söylemen yeterli:
**"~/Documents/XVIIn.dev klasöründeki KALDIGIMIZ-YER.md dosyasını oku, oradan devam edelim."**

---

## Proje ne?
Ege'nin (XVIIn) kişisel sitesi: projelerini sergileyen, linklerini toplayan ve neler yapabildiğini gösterişli biçimde kanıtlayan, CV gibi ama kişisel bilgi dökümü olmayan bir site. Ton: "Ben XVIIn'ım."
Referans: cobanov.dev — yapısı ilham, **aynısı değil**. Hedef: Apple ürün sayfaları gibi kaydırdıkça canlanan interaktif sahneler.

## Şu an yayında
- **Site:** https://xviin-dev.vercel.app
- **GitHub:** https://github.com/Xviin/XVIIn.dev (herkese açık)
- **Barındırma:** Vercel (ücretsiz). Proje adı `xviin-dev`, **Root Directory = `site`**, `site/vercel.json` → framework nextjs.
- **Yayına alma:** GitHub Desktop → **Push origin**. Vercel her push'ta otomatik yayınlar.
- Tarayıcı eski hali gösterirse: Cmd+Shift+R ya da gizli pencere.

## Klasör yapısı (`~/Documents/XVIIn.dev`, tek git reposu)
- `site/` — Next.js 16 sitesi (asıl kod)
- `docs/superpowers/specs/2026-11-13-xviin-dev-site-design.md` — onaylı tasarım dokümanı
- `docs/superpowers/plans/2026-11-13-xviin-dev-skeleton.md` — 1. aşama (iskelet) planı, tamamlandı
- `brand/` — logo dosyaları (SVG + PNG) ve GitHub avatarı
- `Claude outputs/` — logo denemeleri (git dışında)

## Teknik özet
- Next.js 16 (App Router, TypeScript), Tailwind 4, next-intl, MDX içerik, Vitest + Playwright testleri (39 e2e + 9 unit, hepsi yeşil).
- **Dil:** İngilizce ana dil (`/`), Türkçe ikinci dil (`/tr`). Metinler: `site/messages/en.json`, `tr.json`.
- **Proje eklemek:** `site/content/projects/<slug>/en.mdx` (+ isteğe bağlı `tr.mdx`). Türkçe yoksa İngilizcesi notla gösterilir. Her projenin kendi sayfası var: `/projects/<slug>`.
- **Projeye özel sahne/demo:** bileşeni yazıp `site/src/components/projects/scenes.ts` içine slug ile kaydet.
- **Linkler:** `site/src/content/site.ts` — şu an GitHub (github.com/Xviin) ve e-posta (xviin.clu@gmail.com). LinkedIn bilerek kaldırıldı, X yok.
- **Giriş ekranı (BİTTİ, Ege onayladı):** `site/src/components/intro/IntroGate.tsx` + `IntroLogo.tsx` (+ harf yolları `introLogoPaths.ts`, animasyon CSS'i `globals.css` sonunda `intro-*`). Siyah zemin. Akış (~6,5 sn): rozet dıştan içe GRİ yerleşir (mavi kenar → krem kenar → siyah oval → ince çizgi kendini çizer → X,V,I,I,n tek tek damga gibi → yıldız sol üstten dönerek düşer, iki kez zıplayıp oturur) → renk üst-orta ve alt-ortadan sağa-sola yayılır → yıldızdaki imleç yanıp söner. Oturumda bir kez; tıklama/tuş/9 sn ile kapanır. Taslak: `Claude outputs/xviin-giris-taslak.html`.
- Ortam notu: Claude'un bulut ortamında npm kapalı olabiliyor; paketler Ege'nin bilgisayarındaki çalışma ortamından iniyor. Mac'te çalıştırmak için: `cd site && npm install && npm run dev` → localhost:3000.

## Ana sayfa (13 Kasım)
- Büyük logo ve "Yapay zekâ ile…" yazısı kaldırıldı; sayfa genişledi (en fazla 1800px), Projeler en üstte.
- Sağda kare **"Şu an" kutusu**: üzerinde çalışılan proje + App Store geri sayımı + "Sırada" + "Son güncelleme" (site yayına alındığı gün).
- **Kutuyu güncellemek:** `site/src/content/now.ts` → `slug` (şu anki proje), `launch` (çıkış günü, YYYY-AA-GG), `next` (sıradaki). Proje `status: live` olunca kutu "App Store'da yayında" yazar.
- Claff çıkış günü kutuda 16 Kasım 2026 olarak ayarlı — Ege doğrulasın.

## Logo (KARAR VERİLDİ)
**Ana logo = Rozet, her yerde:** `brand/xviin-rozet.svg` / `.png`
- Kömür siyahı oval (#2B2B2C), içinde kâğıt rengi oyulmuş kalın **XVII n** harfleri
- Kesme işaretinin yerinde dört köşeli yıldız; içi siyah, **ortasında yanıp sönen terminal imleci**
- Krem (#F4ECD4) + gök mavisi (#5DB7E8) çift sticker kenarı, grenli kâğıt zemin (#F3F0E9)
- Sitede: üst menü, ana sayfa hero, giriş ekranı, sekme ikonu, iPhone ikonu, paylaşım (OG) görseli → hepsi uygulandı
- Yardımcı parçalar (Ege beğendi): `brand/xviin-sticker` (kalın italik XVIIn + 5 köşeli yıldız, aynı renkler), `brand/xviin-piksel` (piksel/bitmap italik XVIIn + ince piksel oval)
- **GitHub avatarı:** `brand/xviin-github-avatar.png` → github.com → Settings → Profile picture'dan yüklenecek (yapıldı mı kontrol et)

**Ege'nin zevki (logo/tasarım için):** sokak giyimi (streetwear) estetiği, kalın punto, oval rozet, dört köşeli yıldız, krom/parlama, sticker kenar, piksel/LED dokular. **Sevmedikleri:** neon tabela, düz nokta matris, Matrix/Tron klişeleri (AI popüler kültürü çağrışımı istemiyor), bordo-lacivert geçişli harman.

## Sıradaki adımlar
1. ~~Giriş ekranı~~ — bitti (13 Kasım). GitHub Desktop'tan commit + push edildi mi kontrol et.
2. **Apple tarzı kaydırma sahneleri** — Ege referans atacak. GSAP + Three.js bu aşamada eklenecek.
3. **Proje içerikleri** — Claff sayfası HAZIR (13 Kasım): ikon, 5 ekran görüntüsü (kaydırmalı şerit, `site/src/components/projects/scenes/ClaffScene.tsx`, görseller `site/public/projects/claff/`), EN+TR metin. Ekran görüntülerinde kart son 4 hanesi / abone numaraları / daire no silindi. **App Store'a çıkınca:** `content/projects/claff/en.mdx` + `tr.mdx` → `status: live`, `links:` ile App Store linki ekle, "Coming to the App Store…" cümlesini güncelle. Kalanlar: Mac ağ/internet bilgisi aracı, şirket panelleri (**gerçek veri YOK**, sahte veriyle tıklanabilir demo). Metinler şu an yer tutucu.
4. **Alan adı** — xviin.dev alınırsa Vercel'e bağla (site URL'si `site/src/content/config.ts`, varsayılan https://xviin.dev).
5. Ertelenen küçükler: Türkçe yedek sayfalarda lang/canonical, dil değişince #hash kaybı, metadata yerelleştirme, dil düğmesi aria-label, frontmatter link doğrulama, uzun kelime kırma, proje yazısı tipografisi.

## Çalışma şekli (Ege için önemli)
- Ege teknik değil ama detaylı konuşabilir; **çok soru sorulunca bunalıyor** — az ve net soru, somut taslak göster.
- Görsel kararlar her zaman Ege'nin; Claude öneri yerine taslak üretip seçtirir.
- Türkçe konuşuyoruz.
