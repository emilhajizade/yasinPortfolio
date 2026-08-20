# Yasin Hüseynov — Bodybuilding Coach saytı

Bu, tam statik (HTML/CSS/JS) sayt paketidir — backend, verilənlər bazası
və ya hosting abunəliyi tələb etmir. Faylı istənilən veb-hostinqə
yükləmək kifayətdir.

## Fayl strukturu

```
index.html        → Ana səhifə
haqqimda.html      → Haqqımda (bio, sertifikatlar, yarış tarixçəsi)
xidmetler.html     → Xidmətlər, qiymətlər, FAQ
qalereya.html      → Foto qalereya (filter + lightbox)
elaqe.html         → Əlaqə forması və məlumatları
css/style.css      → Bütün dizayn (rənglər, tipoqrafiya, komponentlər)
js/main.js         → Menyu, animasiya, FAQ, qalereya filtri, form
```

## Yerli baxış

Sadəcə `index.html`-i brauzerdə açın. Server lazım deyil.

## Mütləq dəyişdirilməli hissələr

1. **Şəkillər** — Hər səhifədə tünd-bürünc rəngli, "Şəkil əlavə edin"
   yazan xanalar (`<div class="photo-frame">...</div>`) var. Bunları öz
   fotolarınızla əvəz etmək üçün, məsələn:

   ```html
   <div class="photo-frame">...</div>
   ```

   sətrini

   ```html
   <img
     src="images/portret.jpg"
     alt="Yasin Hüseynov"
     style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"
   />
   ```

   ilə əvəz edin. `images/` qovluğu yaradıb şəkilləri ora yükləyin.

2. **Ad, bio mətni, sertifikatlar, yarış nailiyyətləri** —
   `haqqimda.html` içində nümunə mətnlərdir, real məlumatla dəyişin.

3. **Qiymətlər və müddətlər** — `xidmetler.html`-də hər xidmətin
   yanında "\* Qiymət nümunədir" qeydi var — real qiymətinizi yazın.

4. **Əlaqə məlumatları** — bütün səhifələrin footer və `elaqe.html`
   hissəsində geçən:
   - Telefon: `+994 50 123 45 67`
   - E-poçt: ``
   - WhatsApp linki: `https://wa.me/994516693500`
     (bunları hər fayldа tapıb öz nömrənizlə/ünvanınızla dəyişin —
     WhatsApp linki `994` ilə başlayıb boşluqsuz, `+` işarəsiz yazılmalıdır)

5. **Sosial media** — footer-dəki Instagram/Facebook linkləri hazırda
   `href="#"` — öz profil linklərinizi yazın.

6. **Google Xəritə** — `elaqe.html`-də "Google Xəritə" yazan xananı
   Google Maps-dan aldığınız `<iframe>` embed kodu ilə əvəz edə bilərsiniz.

## Əlaqə formu haqqında (VACIB)

Form hazırda backend olmadığı üçün "göndər" düyməsi yalnız uğurlu
mesajı göstərir, real e-poçt/bildiriş **göndərmir**. Bunu real
işlək etmək üçün ən sadə yollar:

- **Formspree.io** (pulsuz plan) — hesab açıb aldığınız linki
  `elaqe.html`-də `<form id="contactForm" ...>` tag-ına
  `action="https://formspree.io/f/XXXXX" method="POST"` kimi əlavə edin
  və `js/main.js`-də `initContactForm` funksiyasındakı
  `e.preventDefault()` sətrini silin.
- **EmailJS.com** — JS ilə birbaşa brauzerdən e-poçt göndərir.
- Alternativ olaraq WhatsApp və telefon linkləri artıq işləkdir —
  bu gündən müştəri sizə birbaşa yaza bilər.

## Haralara pulsuz yükləmək olar

Statik sayt olduğu üçün bu xidmətlərdən istənilən birinə birbaşa
yükləyə bilərsiniz: **Netlify**, **Vercel**, **GitHub Pages**,
**Cloudflare Pages**. Hər üçü sürüklə-burax üsulu ilə pulsuz dərc imkanı verir.
