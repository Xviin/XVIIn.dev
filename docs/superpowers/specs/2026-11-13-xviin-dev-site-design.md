# XVIIn.dev — Kişisel Site Tasarım Dokümanı

Tarih: 2026-11-13 · Sahibi: Ege (XVIIn) · Durum: onaylandı (2026-11-13)

## 1. Amaç ve neden

Ege, AI ile ürün geliştiren bir "vibe coder" olarak kendini **XVIIn** kimliğiyle tanıtmak istiyor.
Site üç işi aynı anda yapacak:

1. **Projelerini göstermek** (uygulamalar, araçlar, paneller)
2. **Profillerine yönlendirmek** (GitHub, LinkedIn vb.)
3. **Neler yapabildiğini gösterişli biçimde kanıtlamak** — site kendisi yeteneğin ilk kanıtı.

Ton: "Ben XVIIn'ım." CV gibi ama kişisel bilgi dökümü yok; bir isimden çok bir karakter/marka.

Referans: cobanov.dev — yapısı (proje kartları, linkler, interaktif içerik) ilham, **aynısı istenmiyor**.
İstenen fark: Apple ürün sayfaları gibi, kaydırdıkça kendiliğinden canlanan interaktif sahneler.

## 2. Hedefler

- Siyah temalı, güçlü bir **giriş ekranı** (intro) → asıl siteye geçiş.
- **Projeler vitrini**: ilk yıldız Claff: Bills & Payments (iOS, ~18 Kasım 2026 yayında).
- **Linkler**: GitHub, LinkedIn ve diğer profiller; sitede ve footer'da sürekli erişilebilir.
- **Apple tarzı interaktif bölümler**: scroll ile tetiklenen, kendi kendine hareket eden sahneler.
- Yeni proje eklemek kolay olmalı (kod bilgisi gerektirmeyen, tek dosya ekle → listede görünür).
- Sitenin kodu GitHub'da public durur; site kendisi bir portfolyo projesi.

## 3. Hedef olmayanlar

- Blog / yazı bölümü (ilk sürümde yok; ileride eklenebilir).
- Ayrıntılı CV, kişisel bilgiler (doğum, adres vb.).
- Yönetim paneli / CMS.

## 4. Anti-hedefler (çalışsa bile başarısızlık sayılır)

- **Hazır şablon görünümü** — "bunu bir template'ten almış" izlenimi.
- **Matrix / Tron klişesi** — Ege bunu açıkça istemiyor (AI popüler kültürünün klişesi). Görsel dil Ege'nin tarifinden gelecek.
- cobanov.dev'in kopyası gibi durmak.
- Gerçek şirket verisinin sızması (paneller).

## 5. Kısıtlar

- Süre: ilk tam sürüm **5 gün – en fazla 1 hafta**. Tam haliyle çıkacak (sade MVP değil). **Claff lansmanına (~18 Kasım) bağlı değil** — Ege acele etmeden tam sürümü seçti.
- Ege tek kişi; kodu Claude yazar, Ege tasarım/deneyim kararlarını verir ve detaylı teknik konuşabilir.
- Paneller gerçek şirket verisi içerir → sitede yalnızca **sahte veriyle demo** halleri.

## 6. Yaklaşımlar

| | Yaklaşım | Artı | Eksi |
|---|---|---|---|
| **A (seçildi)** | Next.js + GSAP + Three.js, Vercel | Apple tarzı scroll (GSAP standardı), 3D (Three.js), proje başına dosya, ücretsiz hosting, GitHub'a bağlı otomatik yayın, kod public → portfolyo | En çok kod; yazan Claude |
| B | Astro + GSAP + Three.js | Daha hafif/hızlı | Astro içerik siteleri için; yoğun interaktif sitede ona karşı çalışılır |
| C | Framer | En hızlı, hazır efektler | 3D/özel demo sınırlı, aylık ücret, "bunu ben yaptım" kodu yok — amaca ters |

**Seçim: A.** Ege'nin sorusu: "hazır şey kullanınca bizim yaptığımızın önemi kalır mı?" — Kütüphaneler alet, şablon değil; ekranda görünen her şey sıfırdan yazılır. Ege bu açıklamayla A'yı onayladı.

## 7. Ege'nin kararları

- Siyah tema.
- Giriş ekranı: ortada alışılmadık bir fontla karşılama ("XVIIn" / "Welcome to XVIIn.dev" gibi), belki bir **3D yüz**. Mevcut taslak görselde: parlayan kalın "XVIIn", altında ince çizgi, "tıkla · geç" yönergesi.
- **Giriş ekranının detaylarını Ege sırası gelince tarif edecek.** Görsel dil önerisi Claude'dan gelmeyecek.
- Apple tarzı / referanslarını Ege toplayıp atacak; interaktif sahneler birlikte geliştirilecek.
- Projeler: Claff (finans uygulaması), Mac için internet/ağ bilgisi aracı, şirket panelleri, "ve diğerleri".
- Tam sürüm, 5 gün–1 hafta.
- **Dil: İngilizce ana dil, Türkçe ikinci dil** (iki dilli site, baştan buna göre kurulur).
- **Her projenin kendi sayfası olacak.** Proje içerikleri, demolar, sahneler ve görseller Ege tarafından sırası gelince verilecek; site önce iskelet olarak kurulur, içerik sonra doldurulur.

## 8. Claude'un kararları (Ege düzeltebilir)

- Paneller (Ege hangilerini verirse) sahte veriyle, tıklanabilir demo olarak gösterilir.
- Proje sayfası şablonu, sayfaya özel demo veya scroll sahnesi eklenebilecek şekilde esnek kurulur.
- Projeler `content/projects/*.mdx` (veya benzeri) dosyalarda tutulur; yeni proje = yeni dosya.
- İş sırası: önce iskelet + sade bölümler (projeler, linkler), sonra zamanın çoğu intro'ya ve interaktif sahnelere.
- Hosting: Vercel (ücretsiz plan), repo: GitHub public.
- Ege'nin intro/görsel tarifleri gelene kadar Claude iskeleti, projeler, linkler ve proje sayfalarını bitirir; sahneler en sona kalır.
- Her projenin kendi detay sayfası olur (aynı proje dosyasından üretilir); ana sayfada kart olarak listelenir.
- Hareket azaltma tercihi (prefers-reduced-motion) ve mobil uyum desteklenir; 3D/ağır sahneler mobilde hafifletilir.

## 9. Site yapısı (taslak)

```
[ INTRO ]  siyah ekran · karşılama · (3D yüz?) · tıkla/bekle → geç
[ HERO ]   XVIIn · tek cümle kim olduğum
[ SHOWCASE ] Apple tarzı scroll sahneleri — Claff başta
[ PROJELER ] kartlar: isim, tür, yıl, kısa açıklama, link/demo
[ YETENEKLER / NASIL ÇALIŞIYORUM ] AI ile ürün geliştirme
[ İLETİŞİM + LİNKLER ] GitHub · LinkedIn · X · e-posta
```

## 10. Açık kalanlar

- Giriş ekranı ve genel görsel dil (Ege tarif edecek).
- Apple tarzı referanslar (Ege atacak).
- Mac aracının ne yaptığı ve proje metinleri.
- Proje içerikleri ve hangi projeye ne tür demo/sahne yapılacağı (Ege sırası gelince verecek).
