import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE,
  NAV,
  PROCESS,
  VALUES,
  SERVICES,
  PROJECTS,
  PROJECT_CATEGORIES,
  FAQS,
  HOME_FAQ,
  SERVICE_OPTIONS,
} from "./site-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANIFEST = JSON.parse(
  fs.readFileSync(path.join(ROOT, "assets", "images", "manifest.json"), "utf8")
);

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const abs = (p = "/") => new URL(p, `${SITE.domain}/`).href;
const year = new Date().getFullYear();
const waText = `السلام عليكم، أرغب بالاستفسار عن خدمات ${SITE.name}.`;
const waHref = (text = waText) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const telHref = `tel:${SITE.phoneHref}`;

const ICONS = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12.5 5 5L20 6.5"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  ruler: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17.5 17.5 3 21 6.5 6.5 21 3 17.5Z"/><path d="m7 14 2 2M10 11l2 2M13 8l2 2"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  tools: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.7 6.3 3 3"/><path d="M3 21l3.2-3.2"/><path d="m5 13 6 6"/><path d="m14 4 6 6-3 3-6-6Z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></svg>`,
  panels: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/><path d="M6.5 7h.01M17.5 7h.01"/></svg>`,
  store: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 5 3h14l2 6"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/><path d="M3 9h18"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h.01M14 7h.01M9 11h.01M14 11h.01M9 15h.01M14 15h.01"/><path d="M10 21v-3h4v3"/></svg>`,
  door: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21h14"/><path d="M7 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17"/><circle cx="15" cy="12" r=".9"/></svg>`,
  partition: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 3v18M20 3v18"/><path d="M4 8h16M4 16h16"/><path d="M12 8v8"/></svg>`,
  shower: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V9a4 4 0 0 1 8 0v1"/><path d="M12 7h8l-2 5H12Z"/><path d="M6 14v.01M9 17v.01M6 20v.01"/></svg>`,
  custom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.56l-5.9 3.11 1.13-6.57-4.78-4.66 6.6-.96L12 2.5Z"/></svg>`,
};

function image(name, options = {}) {
  const m = MANIFEST[name];
  if (!m) throw new Error(`Missing image: ${name}`);
  const alt = esc(options.alt ?? m.alt);
  const sizes = options.sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  const eager = options.eager === true;
  const className = options.className ? ` class="${options.className}"` : "";
  const imgClass = options.imgClass ? ` class="${options.imgClass}"` : "";
  const loading = eager
    ? `loading="eager" fetchpriority="high"`
    : `loading="lazy" decoding="async"`;
  return `<picture${className}>
  <source type="image/webp" srcset="/assets/images/${name}-sm.webp 900w, /assets/images/${name}.webp 1600w" sizes="${sizes}">
  <img${imgClass} src="/assets/images/${name}.jpg" srcset="/assets/images/${name}-sm.jpg 900w, /assets/images/${name}.jpg 1600w" sizes="${sizes}" alt="${alt}" width="${m.width}" height="${m.height}" ${loading}>
</picture>`;
}

function head({ title, description, canonicalPath, imageName = "og-cover", schemas = [], bodyClass = "", noindex = false }) {
  const fullTitle = title.includes(SITE.shortName)
    ? title
    : `${title} | ${SITE.name}`;
  const canonical = abs(canonicalPath);
  const ogImage = imageName === "og-cover"
    ? abs("/assets/images/og-cover.jpg")
    : abs(`/assets/images/${imageName}.jpg`);
  const schemaTags = schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n");
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}">
  <meta name="author" content="${esc(SITE.name)}">
  <meta name="theme-color" content="#08141f">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="ar" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">

  <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/brand/favicon-64.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">

  <link rel="preload" href="/assets/fonts/tajawal-700-arabic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/tajawal-800-arabic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/plex-arabic-400.woff2" as="font" type="font/woff2" crossorigin>

  <meta property="og:type" content="website">
  <meta property="og:locale" content="ar_SA">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(SITE.name)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(fullTitle)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${ogImage}">

  <script>document.documentElement.classList.add("js");</script>
  <link rel="stylesheet" href="/assets/css/styles.css">
  ${schemaTags}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""} data-whatsapp="${SITE.whatsapp}">
  <a class="skip-link" href="#main">تجاوز إلى المحتوى</a>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>`;
}

function brandMark(extraClass = "") {
  return `<a class="brand ${extraClass}" href="/" aria-label="${esc(SITE.name)} — الصفحة الرئيسية">
  <span class="brand__badge"><img src="/assets/brand/logo-square.webp" width="700" height="700" alt="" loading="eager"></span>
  <span class="brand__text"><strong>ريم النفوذ</strong><small>للزجاج السكريت والألمنيوم</small></span>
</a>`;
}

function header(active = "/") {
  const isActive = (href) =>
    href === "/" ? active === "/" : active === href || active.startsWith(href.replace(".html", "/"));
  const serviceActive = active === "/services.html" || active.startsWith("/services/");
  const desktopLinks = NAV.map((item) => {
    if (item.children) {
      const items = SERVICES.map(
        (s) => `<a href="/services/${s.slug}.html">
          <span class="dropdown__icon">${ICONS[s.icon]}</span>
          <span><strong>${s.title}</strong><small>${s.navTitle}</small></span>
        </a>`
      ).join("");
      return `<li class="has-dropdown${serviceActive ? " is-active" : ""}">
        <a href="${item.href}" ${serviceActive ? 'aria-current="page"' : ""}>${item.label} <span class="nav-chevron">${ICONS.chevron}</span></a>
        <div class="dropdown" role="group" aria-label="خدمات المؤسسة">
          <div class="dropdown__head"><span>خدماتنا</span><a href="/services.html">عرض الكل ${ICONS.arrow}</a></div>
          <div class="dropdown__grid">${items}</div>
        </div>
      </li>`;
    }
    return `<li><a href="${item.href}" ${isActive(item.href) ? 'aria-current="page"' : ""}>${item.label}</a></li>`;
  }).join("");

  const mobileLinks = NAV.map((item) => {
    if (item.children) {
      const sub = SERVICES.map(
        (s) => `<a class="mobile-nav__sub" href="/services/${s.slug}.html">${s.title}</a>`
      ).join("");
      return `<div class="mobile-nav__group">
        <a class="mobile-nav__link" href="${item.href}">${item.label} ${ICONS.arrow}</a>
        <div class="mobile-nav__subs">${sub}</div>
      </div>`;
    }
    return `<a class="mobile-nav__link" href="${item.href}">${item.label} ${ICONS.arrow}</a>`;
  }).join("");

  return `<div class="topbar">
    <div class="container topbar__inner">
      <p class="topbar__tag">تفصيل وتركيب الزجاج السكريت والألمنيوم — ${SITE.city} والمملكة</p>
      <div class="topbar__links">
        <a href="${telHref}">${ICONS.phone}<span dir="ltr">${SITE.phoneDisplay}</span></a>
        <span class="topbar__sep" aria-hidden="true"></span>
        <a href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>واتساب</span></a>
        <span class="topbar__hours">${ICONS.clock}<span>${SITE.hours}</span></span>
      </div>
    </div>
  </div>
  <header class="site-header" id="site-header">
    <div class="container header__inner">
      ${brandMark()}
      <nav class="main-nav" aria-label="التنقل الرئيسي">
        <ul>${desktopLinks}</ul>
      </nav>
      <div class="header__actions">
        <a class="btn btn--gold btn--sm header__cta" href="/contact.html#quote">اطلب عرض سعر ${ICONS.arrow}</a>
        <button class="nav-toggle" type="button" aria-label="فتح القائمة" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  <div class="nav-backdrop" data-nav-close aria-hidden="true"></div>
  <aside class="mobile-nav" id="mobile-nav" aria-label="قائمة الجوال" aria-hidden="true">
    <div class="mobile-nav__head">
      ${brandMark("brand--mobile")}
      <button class="mobile-nav__close" type="button" aria-label="إغلاق القائمة" data-nav-close>${ICONS.close}</button>
    </div>
    <nav class="mobile-nav__body">${mobileLinks}</nav>
    <div class="mobile-nav__foot">
      <a class="btn btn--gold" href="/contact.html#quote">اطلب عرض سعر ${ICONS.arrow}</a>
      <div class="mobile-nav__contact">
        <a href="${telHref}">${ICONS.phone}<span dir="ltr">${SITE.phoneDisplay}</span></a>
        <a href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>واتساب</span></a>
      </div>
    </div>
  </aside>`;
}

function footer() {
  const quick = [
    ["/", "الرئيسية"],
    ["/about.html", "من نحن"],
    ["/projects.html", "أعمالنا"],
    ["/faq.html", "الأسئلة الشائعة"],
    ["/contact.html", "تواصل معنا"],
  ]
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
    .join("");
  const serviceLinks = SERVICES.map(
    (s) => `<li><a href="/services/${s.slug}.html">${s.title}</a></li>`
  ).join("");
  return `<footer class="site-footer">
    <div class="footer__glow" aria-hidden="true"></div>
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="/" aria-label="${esc(SITE.name)}"><img src="/assets/brand/logo-wide.webp" width="1200" height="600" alt="${esc(SITE.name)}" loading="lazy"></a>
          <p>مؤسسة متخصصة في تفصيل وتركيب الزجاج السكريت والألمنيوم، وتنفيذ الواجهات الزجاجية للمحلات والمكاتب، والأبواب والقواطع والشاور حسب الطلب.</p>
          <div class="footer__chips"><span>زجاج سكريت</span><span>ألمنيوم</span><span>تفصيل حسب الطلب</span></div>
        </div>
        <div class="footer__col">
          <h3>روابط سريعة</h3>
          <ul>${quick}</ul>
        </div>
        <div class="footer__col">
          <h3>خدماتنا</h3>
          <ul>${serviceLinks}</ul>
        </div>
        <div class="footer__col footer__contact">
          <h3>تواصل معنا</h3>
          <ul>
            <li><a href="${telHref}">${ICONS.phone}<span dir="ltr">${SITE.phoneDisplay}</span></a></li>
            <li><a href="${waHref()}">${ICONS.whatsapp}<span>واتساب</span></a></li>
            <li>${ICONS.pin}<span>${SITE.address}</span></li>
            <li>${ICONS.clock}<span>${SITE.hours}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p>© <span data-year>${year}</span> ${SITE.name}. جميع الحقوق محفوظة.</p>
        <div class="footer__legal">
          <a href="/privacy.html">سياسة الخصوصية</a>
          <span aria-hidden="true">•</span>
          <a href="/sitemap.xml">خريطة الموقع</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function floating() {
  return `<a class="wa-float" href="${waHref()}" target="_blank" rel="noopener" aria-label="تواصل معنا عبر واتساب">
    ${ICONS.whatsapp}<span class="wa-float__label">واتساب</span>
  </a>
  <button class="to-top" type="button" aria-label="العودة إلى أعلى الصفحة">${ICONS.arrowUp}</button>
  <div class="mobile-bar" aria-label="تواصل سريع">
    <a href="${telHref}">${ICONS.phone}<span>اتصل بنا</span></a>
    <a class="mobile-bar__wa" href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>واتساب</span></a>
  </div>
  <dialog class="lightbox" id="lightbox" aria-label="عرض صورة من الأعمال">
    <button class="lightbox__close" type="button" aria-label="إغلاق الصورة" data-lightbox-close>${ICONS.close}</button>
    <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="الصورة السابقة" data-lightbox-prev>${ICONS.arrow}</button>
    <figure class="lightbox__figure">
      <img src="/assets/images/office-black-frame.jpg" alt="" width="1600" height="2133">
      <figcaption><strong data-lightbox-title></strong><span data-lightbox-caption></span></figcaption>
    </figure>
    <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="الصورة التالية" data-lightbox-next>${ICONS.arrow}</button>
  </dialog>`;
}

function eyebrow(text, light = false) {
  return `<span class="eyebrow${light ? " eyebrow--light" : ""}"><span class="eyebrow__line" aria-hidden="true"></span>${text}</span>`;
}

function sectionHead({ tag, title, lead, light = false, center = false, action = "" }) {
  return `<div class="section-head${light ? " section-head--light" : ""}${center ? " section-head--center" : ""}">
    <div class="section-head__main">
      ${eyebrow(tag, light)}
      <h2>${title}</h2>
    </div>
    <div class="section-head__side">
      ${lead ? `<p>${lead}</p>` : ""}
      ${action}
    </div>
  </div>`;
}

function serviceCard(service, index) {
  return `<a class="service-card reveal" href="/services/${service.slug}.html" style="--delay:${(index % 4) * 70}ms">
    <div class="service-card__media">
      ${image(service.image, { sizes: "(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 24vw" })}
      <span class="service-card__num">${String(index + 1).padStart(2, "0")}</span>
      <span class="service-card__icon">${ICONS[service.icon]}</span>
    </div>
    <div class="service-card__body">
      <h3>${service.title}</h3>
      <p>${service.short}</p>
      <span class="service-card__link">تفاصيل الخدمة ${ICONS.arrow}</span>
    </div>
  </a>`;
}

function projectCard(project, options = {}) {
  const widthClass = options.wide ? " project-card--wide" : "";
  return `<figure class="project-card${widthClass} reveal" data-category="${project.category}">
    <button class="project-card__btn" type="button" data-lightbox
      data-src="/assets/images/${project.image}.webp"
      data-title="${esc(project.title)}"
      data-caption="${esc(project.text)}"
      aria-label="عرض صورة: ${esc(project.title)}">
      ${image(project.image, { sizes: options.wide ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw" })}
      <span class="project-card__shade"></span>
      <span class="project-card__content">
        <span class="project-card__cat">${project.categoryLabel}</span>
        <span class="project-card__title">${project.title}</span>
        <span class="project-card__icon">${ICONS.plus}</span>
      </span>
    </button>
  </figure>`;
}

function galleryGrid(items, { filterable = false, home = false } = {}) {
  const filters = filterable
    ? `<div class="filters" role="group" aria-label="تصفية الأعمال">
        ${PROJECT_CATEGORIES.map(
          (c, i) => `<button class="filter${i === 0 ? " is-active" : ""}" type="button" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`
        ).join("")}
      </div>`
    : "";
  const cards = items
    .map((p, i) => {
      const wide = home ? i === 0 || i === 4 : i % 5 === 0;
      return projectCard(p, { wide });
    })
    .join("");
  return `<div class="gallery-wrap">
    ${filters}
    <div class="gallery${home ? " gallery--home" : ""}" data-gallery>${cards}</div>
    <p class="gallery__empty" data-gallery-empty hidden>لا توجد أعمال في هذا التصنيف حاليًا.</p>
  </div>`;
}

function faqList(items, { schema = false } = {}) {
  return `<div class="faq-list">${items
    .map(
      (item, i) => `<details class="faq-item"${i === 0 ? " open" : ""}>
      <summary><span>${item.q}</span><span class="faq-item__icon" aria-hidden="true">${ICONS.plus}</span></summary>
      <div class="faq-item__answer"><p>${item.a}</p></div>
    </details>`
    )
    .join("")}</div>`;
}

function processGrid(compact = false) {
  return `<div class="process__grid${compact ? " process__grid--compact" : ""}">${PROCESS.map(
    (step, i) => `<article class="process-card reveal" style="--delay:${i * 80}ms">
      <span class="process-card__num">${step.n}</span>
      <span class="process-card__icon">${ICONS[step.icon]}</span>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
    </article>`
  ).join("")}</div>`;
}

function ctaBand({ title, text, imageName = "storefront-install" } = {}) {
  return `<section class="cta-band">
    <div class="cta-band__bg" aria-hidden="true">${image(imageName, { sizes: "100vw" })}</div>
    <div class="cta-band__overlay" aria-hidden="true"></div>
    <div class="container cta-band__inner reveal">
      ${eyebrow("ابدأ مشروعك", true)}
      <h2>${title ?? "جاهز لتحويل مساحتك <em>بلمسة زجاجية؟</em>"}</h2>
      <p>${text ?? "أرسل لنا نوع الخدمة ومقاسات الموقع التقريبية، وسنساعدك في اختيار الحل المناسب ونرسل لك عرض سعر واضحًا."}</p>
      <div class="cta-band__actions">
        <a class="btn btn--gold btn--lg" href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp} اطلب عرض سعر</a>
        <a class="btn btn--ghost btn--lg" href="/contact.html#quote">نموذج الطلب ${ICONS.arrow}</a>
      </div>
      <div class="cta-band__points">
        <span>${ICONS.check} معاينة وقياس</span>
        <span>${ICONS.check} عرض سعر واضح</span>
        <span>${ICONS.check} تنفيذ وتركيب</span>
      </div>
    </div>
  </section>`;
}

function breadcrumb(items) {
  return `<nav class="breadcrumb" aria-label="مسار التنقل">${items
    .map((item, i) => {
      const sep = i > 0 ? `<span class="breadcrumb__sep" aria-hidden="true">/</span>` : "";
      return item.href
        ? `${sep}<a href="${item.href}">${item.label}</a>`
        : `${sep}<span aria-current="page">${item.label}</span>`;
    })
    .join("")}</nav>`;
}

function pageHero({ tag, title, lead, imageName, crumbs, actions = "", compact = false }) {
  return `<section class="page-hero${compact ? " page-hero--compact" : ""}">
    <div class="page-hero__glow" aria-hidden="true"></div>
    <div class="page-hero__grid-bg" aria-hidden="true"></div>
    <div class="container">
      ${breadcrumb(crumbs)}
      <div class="page-hero__inner">
        <div class="page-hero__content reveal">
          ${eyebrow(tag, true)}
          <h1>${title}</h1>
          <p>${lead}</p>
          <div class="page-hero__actions">${actions || `<a class="btn btn--gold" href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp} اطلب عرض سعر</a>
          <a class="btn btn--ghost" href="/projects.html">شاهد أعمالنا ${ICONS.arrow}</a>`}</div>
        </div>
        ${imageName ? `<div class="page-hero__visual reveal" data-delay="1">
          <div class="page-hero__frame">${image(imageName, { sizes: "(max-width: 900px) 90vw, 44vw", eager: true })}</div>
          <span class="page-hero__badge">${ICONS.shield} تنفيذ وتركيب</span>
        </div>` : ""}
      </div>
    </div>
  </section>`;
}

function serviceOption(value) {
  return `<option value="${esc(value)}">${esc(value)}</option>`;
}

function quoteForm(id = "quote") {
  return `<form class="quote-form" id="${id}" data-quote-form novalidate>
    <div class="form-grid">
      <div class="field">
        <label for="q-name">الاسم</label>
        <input id="q-name" name="name" type="text" autocomplete="name" placeholder="اكتب اسمك" required>
      </div>
      <div class="field">
        <label for="q-phone">رقم الجوال</label>
        <input id="q-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="05xxxxxxxx" dir="ltr" required>
      </div>
      <div class="field">
        <label for="q-service">الخدمة المطلوبة</label>
        <select id="q-service" name="service" required>
          <option value="">اختر الخدمة</option>
          ${SERVICE_OPTIONS.map(serviceOption).join("")}
        </select>
      </div>
      <div class="field">
        <label for="q-city">المدينة</label>
        <input id="q-city" name="city" type="text" autocomplete="address-level2" placeholder="مدينة المشروع" required>
      </div>
      <div class="field field--full">
        <label for="q-details">تفاصيل المشروع</label>
        <textarea id="q-details" name="details" rows="4" placeholder="اذكر المقاسات التقريبية، نوع المكان، وأي تفاصيل تساعدنا في التسعير"></textarea>
      </div>
      <div class="field field--full field--consent">
        <label class="checkbox">
          <input type="checkbox" name="consent" required>
          <span>أوافق على التواصل معي عبر واتساب بخصوص هذا الطلب.</span>
        </label>
      </div>
      <div class="field field--full form-submit">
        <button class="btn btn--gold btn--lg" type="submit">${ICONS.whatsapp} إرسال الطلب عبر واتساب</button>
        <p class="form-note">لا يتم تخزين بياناتك على الموقع. سيُفتح واتساب مع رسالة جاهزة للإرسال.</p>
      </div>
    </div>
    <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  </form>`;
}

function contactCards() {
  return `<div class="contact-cards">
    <a class="contact-card" href="${telHref}">
      <span class="contact-card__icon">${ICONS.phone}</span>
      <span><small>اتصل بنا</small><strong dir="ltr">${SITE.phoneDisplay}</strong></span>
    </a>
    <a class="contact-card contact-card--wa" href="${waHref()}" target="_blank" rel="noopener">
      <span class="contact-card__icon">${ICONS.whatsapp}</span>
      <span><small>واتساب</small><strong>محادثة مباشرة</strong></span>
    </a>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Schema builders                                                     */
/* ------------------------------------------------------------------ */

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE.domain}/#organization`,
    name: SITE.name,
    alternateName: [SITE.shortName, SITE.brandEn],
    url: SITE.domain,
    logo: abs("/assets/brand/logo-schema.webp"),
    image: [abs("/assets/images/og-cover.jpg"), abs("/assets/images/office-black-frame.jpg")],
    description:
      "مؤسسة متخصصة في تفصيل وتركيب الزجاج السكريت والألمنيوم، واجهات زجاجية للمحلات والمكاتب، أبواب وقواطع زجاجية، شاور زجاجي، وتنفيذ حسب الطلب.",
    telephone: SITE.phoneHref,
    priceRange: "SAR",
    currenciesAccepted: "SAR",
    paymentAccepted: "نقدي، تحويل بنكي",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "SA",
    },
    areaServed: [
      { "@type": "City", name: SITE.city },
      { "@type": "Country", name: "المملكة العربية السعودية" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات الزجاج والألمنيوم",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: abs(`/services/${s.slug}.html`),
        },
      })),
    },
    knowsAbout: [
      "تركيب زجاج سكريت",
      "واجهات زجاجية",
      "ألمنيوم",
      "قواطع زجاجية",
      "أبواب زجاجية",
      "شاور زجاجي",
    ],
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.name,
    inLanguage: "ar",
    publisher: { "@id": `${SITE.domain}/#organization` },
  };
}

function breadcrumbSchema(items, currentPath = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? abs(item.href) : abs(currentPath),
    })),
  };
}

function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(`/services/${service.slug}.html`)}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: abs(`/services/${service.slug}.html`),
    image: abs(`/assets/images/${service.image}.jpg`),
    provider: { "@id": `${SITE.domain}/#organization` },
    areaServed: [
      { "@type": "City", name: SITE.city },
      { "@type": "Country", name: "المملكة العربية السعودية" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: abs("/contact.html#quote"),
      servicePhone: SITE.phoneHref,
    },
  };
}
function writePage(pathname, { title, description, imageName = "og-cover", schemas = [], bodyClass = "", content, active = pathname }) {
  const html = `${head({ title, description, canonicalPath: pathname, imageName, schemas, bodyClass })}
${header(active)}
<main id="main">
${content}
</main>
${footer()}
${floating()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
  const outPath = pathname === "/" ? path.join(ROOT, "index.html") : path.join(ROOT, pathname.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf8");
  console.log("wrote", path.relative(ROOT, outPath));
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

function homePage() {
  const homeProjects = [PROJECTS[0], PROJECTS[1], PROJECTS[2], PROJECTS[3], PROJECTS[4], PROJECTS[8]];
  const values = VALUES.map(
    (v) => `<li><span class="feature-list__icon">${ICONS[v.icon]}</span><span><strong>${v.title}</strong><small>${v.text}</small></span></li>`
  ).join("");

  const content = `<section class="hero">
    <div class="hero__glow" aria-hidden="true"></div>
    <div class="hero__grid-bg" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__content reveal">
        ${eyebrow("مؤسسة ريم النفوذ للزجاج السكريت والألمنيوم", true)}
        <h1>زجاج سكريت وألمنيوم<br><em>بتفاصيل تُرى</em></h1>
        <p class="hero__lead">من واجهات المحلات والمكاتب إلى الأبواب والقواطع والشاور… نفصّل ونركّب الزجاج السكريت بعناية تناسب مساحتك وهويتك.</p>
        <div class="hero__actions">
          <a class="btn btn--gold btn--lg" href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp} اطلب عرض سعر</a>
          <a class="btn btn--ghost btn--lg" href="/projects.html">شاهد أعمالنا ${ICONS.arrow}</a>
        </div>
        <ul class="hero__points">
          <li>${ICONS.check} تفصيل حسب القياس</li>
          <li>${ICONS.check} تركيب احترافي</li>
          <li>${ICONS.check} مواد وإكسسوارات مناسبة</li>
        </ul>
      </div>
      <div class="hero__visual reveal" data-delay="120">
        <div class="hero__frame">
          ${image("office-black-frame", { sizes: "(max-width: 1024px) 92vw, 42vw", eager: true })}
          <div class="hero__frame-shade" aria-hidden="true"></div>
          <div class="hero__label">${ICONS.layers} زجاج سكريت • ألمنيوم</div>
          <div class="hero__glass-card">
            <span class="hero__glass-icon">${ICONS.shield}</span>
            <span><strong>تنفيذ وتركيب</strong><small>من المعاينة حتى التسليم</small></span>
          </div>
        </div>
        <div class="hero__mini">
          ${image("facade-modern", { sizes: "260px" })}
          <span>واجهات محلات</span>
        </div>
        <div class="hero__seal" aria-hidden="true"><small>تفصيل</small><strong>حسب الطلب</strong></div>
      </div>
    </div>
    <a class="hero__scroll" href="#about"><span aria-hidden="true"></span>اكتشف المزيد</a>
  </section>

  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      ${Array.from({ length: 2 })
        .map(
          () => `<span>زجاج سكريت</span><i>•</i><span>واجهات زجاجية</span><i>•</i><span>ألمنيوم</span><i>•</i><span>أبواب زجاجية</span><i>•</i><span>قواطع</span><i>•</i><span>شاور زجاجي</span><i>•</i><span>تفصيل حسب الطلب</span><i>•</i>`
        )
        .join("")}
    </div>
  </div>

  <section class="section about" id="about">
    <div class="container split split--about">
      <div class="about__media reveal">
        <div class="media-frame media-frame--main">${image("office-frosted-2", { sizes: "(max-width: 900px) 90vw, 44vw" })}</div>
        <div class="about__inset">${image("office-gold", { sizes: "300px" })}</div>
        <div class="about__badge">
          <span class="about__badge-icon">${ICONS.ruler}</span>
          <span><strong>قياس دقيق</strong><small>قبل التصنيع</small></span>
        </div>
        <span class="about__outline" aria-hidden="true"></span>
      </div>
      <div class="about__content reveal" data-delay="100">
        ${eyebrow("من نحن")}
        <h2>مساحات أكثر ضوءًا…<br><em>وتفاصيل أكثر دقة</em></h2>
        <p>في مؤسسة ريم النفوذ نتعامل مع الزجاج كعنصر معماري كامل، لا كقطعة تُركّب فقط. نبدأ من فهم المكان وطريقة استخدامه، ثم نختار الزجاج والألمنيوم والإكسسوارات التي تخدم التصميم وتدوم مع الاستخدام اليومي.</p>
        <p>نفصّل وننفذ الواجهات الزجاجية للمحلات والمكاتب، والأبواب والقواطع، والشاور الزجاجي، والأعمال الخاصة حسب الطلب — بقياسات مأخوذة من الموقع وتركيب يتولاه فريق متخصص.</p>
        <ul class="feature-list">${values}</ul>
        <a class="link-arrow" href="/about.html">تعرّف على المؤسسة ${ICONS.arrow}</a>
      </div>
    </div>
  </section>

  <section class="section section--dark services" id="services">
    <div class="container">
      ${sectionHead({
        tag: "خدماتنا",
        title: "كل ما تحتاجه من الزجاج<br><em>في مكان واحد</em>",
        lead: "سبع خدمات متكاملة تغطي الواجهات والأبواب والقواطع والشاور والأعمال الخاصة. اختر الخدمة أو أرسل لنا فكرتك وسنرشدك للخيار الأنسب.",
        light: true,
      })}
      <div class="services__grid">
        ${SERVICES.map(serviceCard).join("")}
        <a class="service-card service-card--cta reveal" href="/contact.html#quote" style="--delay:280ms">
          <span class="service-card__glow" aria-hidden="true"></span>
          <span class="service-card__icon">${ICONS.chat}</span>
          <h3>لديك مقاس أو فكرة خاصة؟</h3>
          <p>أرسل صورة الموقع والمقاسات التقريبية، وسنساعدك في تحديد نوع الزجاج والتنفيذ المناسب.</p>
          <span class="service-card__link">ابدأ طلبك الآن ${ICONS.arrow}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section projects" id="projects">
    <div class="container">
      ${sectionHead({
        tag: "أعمالنا",
        title: "مشاريع <em>نفّذناها</em> بتفاصيلها",
        lead: "صور من مشاريع واجهات ومكاتب وقواطع وشاور زجاجي. اضغط على أي صورة لعرضها بحجم أكبر.",
        action: `<a class="btn btn--outline" href="/projects.html">كل الأعمال ${ICONS.arrow}</a>`,
      })}
      ${galleryGrid(homeProjects, { home: true })}
    </div>
  </section>

  <section class="section section--sand process" id="process">
    <div class="container">
      ${sectionHead({
        tag: "طريقة العمل",
        title: "خطوات واضحة<br><em>من أول اتصال إلى التسليم</em>",
        lead: "لا مفاجآت في المقاسات أو المواعيد. نتبع مسارًا منظمًا يوضح لك ما يحدث في كل مرحلة.",
        center: true,
      })}
      ${processGrid()}
    </div>
  </section>

  <section class="section faq" id="faq">
    <div class="container faq__layout">
      <div class="faq__intro reveal">
        ${eyebrow("الأسئلة الشائعة")}
        <h2>أسئلة<br><em>تسبق التنفيذ</em></h2>
        <p>جمعنا لك أكثر ما يسأل عنه عملاؤنا قبل بدء مشروع الزجاج. إذا لم تجد إجابتك، تواصل معنا مباشرة.</p>
        <a class="btn btn--outline" href="/faq.html">كل الأسئلة ${ICONS.arrow}</a>
      </div>
      <div class="faq__list reveal" data-delay="100">
        ${faqList(HOME_FAQ)}
      </div>
    </div>
  </section>

  ${ctaBand({ imageName: "storefront-install" })}`;

  return {
    title: "ريم النفوذ | زجاج سكريت وألمنيوم وواجهات زجاجية في الرياض",
    description:
      "مؤسسة ريم النفوذ للزجاج السكريت والألمنيوم: تفصيل وتركيب واجهات زجاجية للمحلات والمكاتب، أبواب وقواطع زجاجية، شاور زجاجي، وتنفيذ حسب الطلب في الرياض والمملكة. اطلب عرض سعر.",
    content,
    schemas: [
      organizationSchema(),
      websiteSchema(),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE.domain}/#webpage`,
        url: SITE.domain,
        name: "ريم النفوذ | زجاج سكريت وألمنيوم وواجهات زجاجية",
        isPartOf: { "@id": `${SITE.domain}/#website` },
        about: { "@id": `${SITE.domain}/#organization` },
        inLanguage: "ar",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

function aboutPage() {
  const valueCards = VALUES.map(
    (v, i) => `<article class="value-card reveal" style="--delay:${i * 70}ms">
      <span class="value-card__icon">${ICONS[v.icon]}</span>
      <h3>${v.title}</h3>
      <p>${v.text}</p>
    </article>`
  ).join("");

  const content = `${pageHero({
    tag: "من نحن",
    title: "زجاج يُصمّم للمكان،<br><em>لا يُختار من الرف</em>",
    lead: "مؤسسة ريم النفوذ للزجاج السكريت والألمنيوم — نعمل على تحويل المساحات إلى واجهات ومكاتب ومساحات أكثر إشراقًا، بتفصيل وتركيب يهتمان بالقياس والتفاصيل.",
    imageName: "office-frosted-2",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "من نحن" }],
  })}

  <section class="section about-story">
    <div class="container split">
      <div class="about-story__media reveal">
        <div class="media-frame">${image("office-construction", { sizes: "(max-width: 900px) 90vw, 46vw" })}</div>
        <div class="about-story__caption"><span>${ICONS.check}</span> نتابع التفاصيل من القياس حتى التسليم</div>
      </div>
      <div class="about-story__content reveal" data-delay="100">
        ${eyebrow("قصتنا")}
        <h2>نبدأ من السؤال الصحيح:<br><em>كيف ستُستخدم هذه المساحة؟</em></h2>
        <p>الزجاج مادة جميلة، لكن نجاح المشروع يعتمد على اختيارها واستخدامها بشكل صحيح. لهذا لا نبدأ بعرض قائمة منتجات، بل نفهم نوع المكان: هل هو محل يستقبل عملاء يوميًا؟ مكتب يحتاج خصوصية؟ حمام يحتاج عزلًا؟ أم واجهة يجب أن تحافظ على الأمان والظهور في الوقت نفسه؟</p>
        <p>بعد ذلك نحدد سماكة الزجاج، نوع الحواف، الإكسسوارات، وطريقة التثبيت. ثم ننفذ ونركّب، ونتأكد من الحركة والإغلاق والتشطيب قبل أن نسلم العمل.</p>
        <div class="about-story__points">
          <div><strong>تفصيل</strong><span>على قياس الموقع</span></div>
          <div><strong>تنفيذ</strong><span>بفريق متخصص</span></div>
          <div><strong>متابعة</strong><span>حتى التسليم</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--sand values">
    <div class="container">
      ${sectionHead({
        tag: "قيمنا",
        title: "أربعة مبادئ<br><em>نعمل بها</em>",
        lead: "ليست شعارات على الورق، بل تفاصيل تظهر في طريقة القياس والتنفيذ والتعامل.",
        center: true,
      })}
      <div class="values__grid">${valueCards}</div>
    </div>
  </section>

  <section class="section process">
    <div class="container">
      ${sectionHead({
        tag: "طريقة العمل",
        title: "مسار واضح<br><em>لكل مشروع</em>",
        lead: "نتبع الخطوات نفسها في كل مشروع، من الاتصال الأول حتى توضيح الضمان بعد التسليم.",
      })}
      ${processGrid()}
    </div>
  </section>

  <section class="section section--dark about-why">
    <div class="container split split--reverse">
      <div class="about-why__content reveal">
        ${eyebrow("لماذا ريم النفوذ", true)}
        <h2>لأن الزجاج لا يحتمل<br><em>التقدير التقريبي</em></h2>
        <p>أي خطأ في المقاس يعني قطعة غير قابلة للتعديل بعد التقسية. لذلك نتعامل مع القياس كمرحلة أساسية، ونراجع تفاصيل التثبيت قبل بدء التصنيع.</p>
        <ul class="check-list check-list--light">
          <li>${ICONS.check} معاينة وقياس فعلي للموقع</li>
          <li>${ICONS.check} اختيار سماكة ونوع زجاج مناسب للاستخدام</li>
          <li>${ICONS.check} إكسسوارات متناسقة مع التصميم</li>
          <li>${ICONS.check} تركيب واختبار قبل التسليم</li>
          <li>${ICONS.check} عرض سعر يوضح المواد والتنفيذ</li>
        </ul>
        <a class="btn btn--gold" href="/contact.html#quote">اطلب معاينة ${ICONS.arrow}</a>
      </div>
      <div class="about-why__media reveal" data-delay="100">
        <div class="media-frame media-frame--offset">${image("office-black-frame", { sizes: "(max-width: 900px) 90vw, 44vw" })}</div>
        <div class="about-why__tag">${ICONS.shield}<span>تنفيذ وتركيب<br><strong>مسؤولية كاملة</strong></span></div>
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "مساحتك تستحق<br><em>حلًا مفصّلًا عليها</em>",
    text: "سواء كان مشروعك واجهة محل أو مكتبًا أو شاورًا منزليًا، أرسل لنا التفاصيل وسنقترح الحل المناسب.",
    imageName: "facade-modern",
  })}`;

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about.html" },
  ];
  return {
    title: "من نحن | مؤسسة ريم النفوذ للزجاج والألمنيوم",
    description:
      "تعرّف على مؤسسة ريم النفوذ للزجاج السكريت والألمنيوم: طريقة عملنا في القياس والتفصيل والتركيب، وقيمنا في تنفيذ الواجهات والقواطع والأبواب والشاور الزجاجي.",
    content,
    imageName: "office-frosted-2",
    schemas: [
      organizationSchema(),
      breadcrumbSchema(crumbs, "/about.html"),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: abs("/about.html"),
        name: "من نحن | مؤسسة ريم النفوذ للزجاج والألمنيوم",
        isPartOf: { "@id": `${SITE.domain}/#website` },
        about: { "@id": `${SITE.domain}/#organization` },
        inLanguage: "ar",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Services overview                                                   */
/* ------------------------------------------------------------------ */

function servicesPage() {
  const content = `${pageHero({
    tag: "خدماتنا",
    title: "خدمات زجاج وألمنيوم<br><em>من القياس إلى التركيب</em>",
    lead: "سبع خدمات متخصصة في الزجاج السكريت والألمنيوم: واجهات المحلات والمكاتب، الأبواب، القواطع، الشاور، والأعمال الخاصة حسب الطلب.",
    imageName: "office-black-2",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "الخدمات" }],
  })}

  <section class="section services-page">
    <div class="container">
      <div class="intro-text reveal">
        <p>لا نقدم خدمة واحدة فقط، بل نغطي رحلة الزجاج كاملة: نستمع للفكرة، نعاين ونقيس، نقترح المواد والإكسسوارات، نصنّع حسب الطلب، ثم نركّب ونسلّم. هذا التكامل يمنع الفجوة التي تحدث عادة بين المقاول والمصنع وفريق التركيب.</p>
        <p>اختر الخدمة الأقرب لمشروعك، أو تواصل معنا إن كنت غير متأكد من النوع المناسب — سنساعدك في تحديده.</p>
      </div>
      <div class="services__grid services__grid--light">
        ${SERVICES.map(serviceCard).join("")}
        <a class="service-card service-card--cta service-card--cta-light reveal" href="/contact.html#quote" style="--delay:280ms">
          <span class="service-card__icon">${ICONS.chat}</span>
          <h3>مشروع خاص؟</h3>
          <p>أرسل المقاسات أو الصور، وسنراجع إمكانية التنفيذ ونرسل لك عرض سعر.</p>
          <span class="service-card__link">اطلب عرض سعر ${ICONS.arrow}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section section--sand process">
    <div class="container">
      ${sectionHead({
        tag: "طريقة العمل",
        title: "كيف ننفّذ<br><em>الخدمة؟</em>",
        lead: "خطوات ثابتة تضمن أن كل تفصيلة في مكانها قبل وبعد التركيب.",
        center: true,
      })}
      ${processGrid()}
    </div>
  </section>

  <section class="section faq">
    <div class="container faq__layout">
      <div class="faq__intro reveal">
        ${eyebrow("قبل أن تبدأ")}
        <h2>أجوبة سريعة<br><em>عن خدماتنا</em></h2>
        <p>اخترنا أربعة أسئلة تتكرر عند طلب عرض السعر. المزيد في صفحة الأسئلة الشائعة.</p>
        <a class="btn btn--outline" href="/faq.html">كل الأسئلة ${ICONS.arrow}</a>
      </div>
      <div class="faq__list reveal" data-delay="100">${faqList([FAQS[2], FAQS[3], FAQS[4], FAQS[5]])}</div>
    </div>
  </section>

  ${ctaBand({ imageName: "facade-concrete" })}`;

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "الخدمات", href: "/services.html" },
  ];
  return {
    title: "خدمات الزجاج والألمنيوم | واجهات وأبواب وقواطع وشاور – ريم النفوذ",
    description:
      "خدمات مؤسسة ريم النفوذ: تركيب زجاج سكريت، واجهات زجاجية للمحلات والمكاتب، أبواب وقواطع زجاجية، شاور زجاجي، وتفصيل حسب الطلب مع قياس وتركيب احترافي.",
    content,
    imageName: "office-black-2",
    schemas: [
      organizationSchema(),
      breadcrumbSchema(crumbs, "/services.html"),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        url: abs("/services.html"),
        name: "خدمات الزجاج والألمنيوم",
        isPartOf: { "@id": `${SITE.domain}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            url: abs(`/services/${s.slug}.html`),
          })),
        },
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

function projectsPage() {
  const content = `${pageHero({
    tag: "معرض الأعمال",
    title: "أعمال زجاجية<br><em>تتحدث عن نفسها</em>",
    lead: "صور من مشاريع نفّذناها في واجهات المحلات والمكاتب والقواطع والأبواب والشاور الزجاجي. استخدم التصنيفات لتصفح نوع العمل.",
    imageName: "facade-concrete",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "أعمالنا" }],
  })}

  <section class="section projects-page">
    <div class="container">
      ${galleryGrid(PROJECTS, { filterable: true })}
    </div>
  </section>

  <section class="section section--sand projects-note">
    <div class="container projects-note__inner">
      <div class="reveal">
        ${eyebrow("عن المعرض")}
        <h2>كل مشروع له ظروفه<br><em>وقياساته الخاصة</em></h2>
      </div>
      <div class="reveal" data-delay="100">
        <p>الصور المعروضة نماذج من أعمال المؤسسة في الواجهات الزجاجية، القواطع المكتبية، الأبواب، والشاور. تختلف طريقة التنفيذ من مشروع لآخر حسب المساحة، سماكة الزجاج، الإكسسوارات، وطريقة التثبيت.</p>
        <p>إذا أعجبك شكل مشروع معيّن، أرسل لنا الصورة ونوع المكان والمقاسات التقريبية، وسنوضح لك الخيارات المناسبة والفرق في التكلفة.</p>
        <a class="link-arrow" href="/contact.html#quote">اطلب تنفيذًا مشابهًا ${ICONS.arrow}</a>
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "مشروعك القادم<br><em>يبدأ بصورة ومقاس</em>",
    text: "أرسل لنا صورة للمكان أو المقاسات التقريبية، وسنساعدك في اختيار نوع الزجاج والتنفيذ المناسب.",
    imageName: "storefront-blue",
  })}`;

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "أعمالنا", href: "/projects.html" },
  ];
  return {
    title: "أعمالنا | مشاريع واجهات وقواطع وشاور زجاجي – ريم النفوذ",
    description:
      "معرض أعمال مؤسسة ريم النفوذ للزجاج والألمنيوم: واجهات زجاجية للمحلات، قواطع ومكاتب، أبواب زجاجية، وشاور سكريت بتفاصيل تنفيذ حقيقية.",
    content,
    imageName: "facade-concrete",
    schemas: [
      organizationSchema(),
      breadcrumbSchema(crumbs, "/projects.html"),
      {
        "@context": "https://schema.org",
        "@type": ["CollectionPage", "ImageGallery"],
        url: abs("/projects.html"),
        name: "أعمال مؤسسة ريم النفوذ",
        isPartOf: { "@id": `${SITE.domain}/#website` },
        image: PROJECTS.map((p) => abs(`/assets/images/${p.image}.jpg`)),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: PROJECTS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CreativeWork",
              name: p.title,
              description: p.text,
              image: abs(`/assets/images/${p.image}.jpg`),
            },
          })),
        },
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function faqPage() {
  const cats = [...new Set(FAQS.map((f) => f.cat))];
  const groups = cats
    .map(
      (cat) => `<section class="faq-group reveal">
      <div class="faq-group__head"><span class="faq-group__dot"></span><h2>${cat}</h2></div>
      ${faqList(FAQS.filter((f) => f.cat === cat))}
    </section>`
    )
    .join("");

  const content = `${pageHero({
    tag: "الأسئلة الشائعة",
    title: "كل ما تريد معرفته<br><em>قبل طلب الخدمة</em>",
    lead: "أجوبة عن الزجاج السكريت، المعاينة، الأسعار، مدة التنفيذ، الضمان، وخيارات المواد. إذا بقي سؤال، تواصل معنا مباشرة.",
    imageName: "shower-install",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "الأسئلة الشائعة" }],
  })}

  <section class="section faq-page">
    <div class="container faq-page__layout">
      <aside class="faq-page__aside reveal">
        <span class="faq-page__icon">${ICONS.chat}</span>
        <h2>لم تجد<br><em>إجابتك؟</em></h2>
        <p>أرسل لنا سؤالك مع صورة أو وصف للمكان، وسنرد عليك خلال أوقات العمل.</p>
        <a class="btn btn--gold" href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp} اسأل عبر واتساب</a>
        <a class="btn btn--outline" href="tel:${SITE.phoneHref}">${ICONS.phone} اتصل بنا</a>
      </aside>
      <div class="faq-page__content">${groups}</div>
    </div>
  </section>

  ${ctaBand({ imageName: "office-frosted-2" })}`;

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "الأسئلة الشائعة", href: "/faq.html" },
  ];
  return {
    title: "الأسئلة الشائعة عن الزجاج السكريت والتركيب – ريم النفوذ",
    description:
      "أجوبة عن الزجاج السكريت، المعاينة والقياس، أسعار التركيب، مدة التنفيذ، الضمان، وأنواع الإكسسوارات والزجاج المصنفر والعازل.",
    content,
    imageName: "shower-install",
    schemas: [
      organizationSchema(),
      faqSchema(FAQS),
      breadcrumbSchema(crumbs, "/faq.html"),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: abs("/faq.html"),
        name: "الأسئلة الشائعة",
        isPartOf: { "@id": `${SITE.domain}/#website` },
        inLanguage: "ar",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

function contactPage() {
  const content = `${pageHero({
    tag: "تواصل معنا",
    title: "أخبرنا عن مشروعك،<br><em>وسنرد بالتفاصيل</em>",
    lead: "أرسل نوع الخدمة ومقاسات المكان التقريبية عبر النموذج، أو تواصل مباشرة عبر واتساب أو الهاتف. ننسق المعاينة ونرسل عرض سعر واضح.",
    imageName: "storefront-install",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "تواصل معنا" }],
    actions: `<a class="btn btn--gold" href="${waHref()}" target="_blank" rel="noopener">${ICONS.whatsapp} واتساب مباشر</a>
      <a class="btn btn--ghost" href="tel:${SITE.phoneHref}">${ICONS.phone} اتصل الآن</a>`,
  })}

  <section class="section contact-page" id="quote">
    <div class="container contact-page__layout">
      <div class="contact-form-card reveal">
        <div class="contact-form-card__head">
          ${eyebrow("طلب عرض سعر")}
          <h2>أرسل تفاصيل مشروعك</h2>
          <p>املأ الحقول الأساسية، وسيُفتح واتساب برسالة جاهزة تحتوي على طلبك. لا حاجة لإنشاء حساب.</p>
        </div>
        ${quoteForm()}
      </div>
      <aside class="contact-side reveal" data-delay="100">
        ${contactCards()}
        <div class="contact-info">
          <div class="contact-info__item">${ICONS.pin}<div><strong>الموقع</strong><span>${SITE.address}</span></div></div>
          <div class="contact-info__item">${ICONS.clock}<div><strong>أوقات العمل</strong><span>${SITE.hours}</span><span>${SITE.hoursFriday}</span></div></div>
        </div>
        <div class="contact-side__note">
          <span>${ICONS.ruler}</span>
          <p><strong>المعاينة حسب الموقع</strong>نحدد موعد المعاينة بعد فهم نوع الخدمة وحجم المشروع، ونأخذ القياسات النهائية قبل التصنيع.</p>
        </div>
        <a class="contact-map" href="${SITE.mapUrl}" target="_blank" rel="noopener">
          <span>${ICONS.pin} ${SITE.city} — ${SITE.country}</span>
          <span class="contact-map__arrow">${ICONS.arrow}</span>
        </a>
      </aside>
    </div>
  </section>

  <section class="section section--sand contact-steps">
    <div class="container">
      ${sectionHead({
        tag: "بعد الإرسال",
        title: "ماذا يحدث<br><em>بعد طلبك؟</em>",
        lead: "ثلاث خطوات بسيطة تفصلك عن عرض سعر واضح وموعد تنفيذ.",
        center: true,
      })}
      <div class="contact-steps__grid">
        <article class="contact-step reveal"><span>01</span><h3>نراجع الطلب</h3><p>نقرأ تفاصيل الخدمة والمقاسات والمدينة، ونسأل عن أي معلومة ناقصة.</p></article>
        <article class="contact-step reveal" style="--delay:80ms"><span>02</span><h3>ننسق المعاينة</h3><p>نحدد موعدًا للمعاينة عند الحاجة، ونأخذ القياسات الفعلية من الموقع.</p></article>
        <article class="contact-step reveal" style="--delay:160ms"><span>03</span><h3>نرسل العرض</h3><p>نرسل عرض سعر يوضح المواد والإكسسوارات وطريقة التنفيذ والمواعيد.</p></article>
      </div>
    </div>
  </section>`;

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "تواصل معنا", href: "/contact.html" },
  ];
  return {
    title: "تواصل معنا واطلب عرض سعر | ريم النفوذ للزجاج والألمنيوم",
    description:
      "تواصل مع مؤسسة ريم النفوذ للزجاج السكريت والألمنيوم عبر واتساب أو الهاتف، أو أرسل تفاصيل مشروعك من خلال النموذج لطلب معاينة وعرض سعر.",
    content,
    imageName: "storefront-install",
    schemas: [
      organizationSchema(),
      breadcrumbSchema(crumbs, "/contact.html"),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: abs("/contact.html"),
        name: "تواصل مع مؤسسة ريم النفوذ",
        isPartOf: { "@id": `${SITE.domain}/#website` },
        mainEntity: { "@id": `${SITE.domain}/#organization` },
        inLanguage: "ar",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Privacy + 404                                                       */
/* ------------------------------------------------------------------ */

function privacyPage() {
  const content = `${pageHero({
    tag: "سياسة الخصوصية",
    title: "خصوصيتك<br><em>تهمنا</em>",
    lead: "نوضح هنا كيف يتعامل موقع مؤسسة ريم النفوذ مع البيانات التي تدخلها عند طلب عرض سعر أو التواصل معنا.",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "سياسة الخصوصية" }],
    compact: true,
    actions: `<a class="btn btn--gold" href="/contact.html#quote">تواصل معنا ${ICONS.arrow}</a>`,
  })}

  <section class="section legal">
    <div class="container legal__inner prose">
      <h2>البيانات التي تدخلها</h2>
      <p>عند استخدام نموذج طلب عرض السعر، تدخل اسمك ورقم جوالك والمدينة والخدمة المطلوبة وتفاصيل المشروع. هذه البيانات تُستخدم فقط لفهم طلبك والتواصل معك بخصوصه.</p>
      <h2>كيف تُرسل البيانات؟</h2>
      <p>نموذج الموقع لا يخزّن البيانات في قاعدة بيانات. عند الضغط على زر الإرسال، يتم تجهيز رسالة نصية وفتح تطبيق واتساب على جهازك لتأكيد الإرسال. تخضع الرسالة بعد ذلك لسياسة الخصوصية الخاصة بتطبيق واتساب.</p>
      <h2>ملفات تعريف الارتباط</h2>
      <p>هذا الموقع ثابت ولا يستخدم ملفات تعريف ارتباط للتتبع أو الإعلانات. قد تستخدم خدمة الاستضافة ملفات تقنية ضرورية لتقديم الصفحات وحمايتها.</p>
      <h2>روابط خارجية</h2>
      <p>قد تحتوي الصفحات على روابط لواتساب أو خرائط جوجل. عند فتحها تصبح تحت سياسة الخصوصية الخاصة بتلك الخدمات.</p>
      <h2>التواصل</h2>
      <p>لأي سؤال بخصوص الخصوصية، تواصل معنا عبر واتساب <a href="${waHref()}" target="_blank" rel="noopener">محادثة مباشرة</a> أو الهاتف <a href="${telHref}" dir="ltr">${SITE.phoneDisplay}</a>.</p>
      <p class="legal__updated">آخر تحديث: 12 نوفمبر 2026</p>
    </div>
  </section>`;

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "سياسة الخصوصية", href: "/privacy.html" },
  ];
  return {
    title: "سياسة الخصوصية | مؤسسة ريم النفوذ",
    description: "سياسة خصوصية موقع مؤسسة ريم النفوذ للزجاج والألمنيوم: كيفية استخدام بيانات نموذج طلب عرض السعر وواتساب.",
    content,
    schemas: [breadcrumbSchema(crumbs, "/privacy.html")],
  };
}

function notFoundPage() {
  const content = `<section class="not-found">
    <div class="not-found__glow" aria-hidden="true"></div>
    <div class="container not-found__inner">
      <span class="not-found__code">404</span>
      <h1>الصفحة غير موجودة</h1>
      <p>ربما تم نقل الصفحة أو تغيير الرابط. يمكنك العودة للرئيسية أو تصفح خدماتنا وأعمالنا.</p>
      <div class="not-found__actions">
        <a class="btn btn--gold" href="/">العودة للرئيسية ${ICONS.arrow}</a>
        <a class="btn btn--ghost" href="/services.html">تصفح الخدمات</a>
        <a class="btn btn--ghost" href="/projects.html">شاهد أعمالنا</a>
      </div>
    </div>
  </section>`;
  return {
    title: "الصفحة غير موجودة | مؤسسة ريم النفوذ",
    description: "الصفحة المطلوبة غير موجودة. تصفح خدمات وأعمال مؤسسة ريم النفوذ للزجاج والألمنيوم.",
    content,
  };
}

/* ------------------------------------------------------------------ */
/* Service detail pages                                                */
/* ------------------------------------------------------------------ */

const SERVICE_HERO_TITLES = {
  "glass-installation": "تركيب زجاج<br><em>سكريت</em>",
  "shop-fronts": "واجهات زجاجية<br><em>للمحلات</em>",
  "office-facades": "واجهات زجاجية<br><em>للمكاتب</em>",
  "glass-doors": "تركيب أبواب<br><em>زجاجية</em>",
  "glass-partitions": "تركيب قواطع<br><em>زجاجية</em>",
  "shower-glass": "تركيب شاور<br><em>زجاجي</em>",
  "custom-glass": "تفصيل وتركيب<br><em>حسب الطلب</em>",
};

function servicePage(service) {
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const related = others.slice(0, 3);
  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: "الخدمات", href: "/services.html" },
    { label: service.title, href: `/services/${service.slug}.html` },
  ];
  const featureCards = service.features
    .map(
      (f, i) => `<article class="feature-card reveal" style="--delay:${i * 70}ms">
      <span class="feature-card__num">0${i + 1}</span>
      <h3>${f.title}</h3>
      <p>${f.text}</p>
    </article>`
    )
    .join("");
  const includes = service.includes.map((x) => `<li>${ICONS.check}<span>${x}</span></li>`).join("");
  const suitable = service.suitable.map((x) => `<li>${x}</li>`).join("");
  const steps = PROCESS.map(
    (step, i) => `<li><span class="steps-list__num">${step.n}</span><div><strong>${step.title}</strong><p>${step.text}</p></div></li>`
  ).join("");
  const asideRelated = others
    .slice(0, 4)
    .map(
      (s) => `<a href="/services/${s.slug}.html"><span>${ICONS[s.icon]}</span><span>${s.title}</span>${ICONS.arrow}</a>`
    )
    .join("");

  const content = `${pageHero({
    tag: "خدماتنا",
    title: SERVICE_HERO_TITLES[service.slug] ?? service.title,
    lead: service.heroLead,
    imageName: service.image,
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "الخدمات", href: "/services.html" }, { label: service.title }],
    actions: `<a class="btn btn--gold" href="${waHref(`السلام عليكم، أرغب بالاستفسار عن خدمة ${service.title}.`)}" target="_blank" rel="noopener">${ICONS.whatsapp} اطلب عرض سعر</a>
      <a class="btn btn--ghost" href="#details">تفاصيل الخدمة ${ICONS.arrow}</a>`,
  })}

  <section class="section service-page" id="details">
    <div class="container service-layout">
      <article class="service-prose">
        <span class="eyebrow">نظرة عامة</span>
        <h2>${service.title} بقياسات تناسب مساحتك</h2>
        ${service.intro.map((p) => `<p>${p}</p>`).join("")}
        <div class="feature-grid">${featureCards}</div>

        <h2>ماذا تشمل الخدمة؟</h2>
        <p>نحدد نطاق العمل بوضوح منذ البداية، حتى تعرف ما ستحصل عليه قبل التنفيذ. تشمل الخدمة عادةً:</p>
        <ul class="check-grid">${includes}</ul>

        <div class="media-pair">
          <figure>${image(service.gallery[0], { sizes: "(max-width: 900px) 90vw, 34vw" })}<figcaption>${service.title} — نموذج من الأعمال</figcaption></figure>
          <figure>${image(service.gallery[1], { sizes: "(max-width: 900px) 90vw, 34vw" })}<figcaption>تفاصيل التركيب والتشطيب</figcaption></figure>
        </div>

        <h2>أين تُستخدم هذه الخدمة؟</h2>
        <ul class="tag-list">${suitable}</ul>

        <h2>خطوات التنفيذ</h2>
        <ol class="steps-list">${steps}</ol>

        <h2>أسئلة شائعة عن ${service.title}</h2>
        ${faqList(service.faqs)}

        <div class="service-callout">
          <span class="service-callout__icon">${ICONS.ruler}</span>
          <div><strong>لست متأكدًا من المقاس أو النوع المناسب؟</strong><p>أرسل صورة للمكان والمقاسات التقريبية، وسنساعدك في تحديد الخيار الأنسب قبل طلب المعاينة.</p></div>
          <a class="btn btn--gold btn--sm" href="${waHref(`السلام عليكم، لدي استفسار عن ${service.title}.`)}" target="_blank" rel="noopener">اسأل الآن ${ICONS.arrow}</a>
        </div>
      </article>

      <aside class="service-aside">
        <div class="quote-card">
          <span class="quote-card__icon">${ICONS.whatsapp}</span>
          <h2>اطلب معاينة<br>أو عرض سعر</h2>
          <p>أرسل لنا نوع الخدمة والمدينة والمقاسات التقريبية، وسنوضح الخطوات التالية.</p>
          <a class="btn btn--gold" href="${waHref(`السلام عليكم، أرغب بطلب عرض سعر لخدمة ${service.title}.`)}" target="_blank" rel="noopener">${ICONS.whatsapp} واتساب مباشر</a>
          <a class="btn btn--outline" href="tel:${SITE.phoneHref}">${ICONS.phone} <span dir="ltr">${SITE.phoneDisplay}</span></a>
          <ul class="quote-card__points">
            <li>${ICONS.check} معاينة حسب الموقع</li>
            <li>${ICONS.check} عرض سعر يوضح المواد</li>
            <li>${ICONS.check} تنفيذ وتركيب</li>
          </ul>
        </div>
        <div class="aside-services">
          <h3>خدمات أخرى</h3>
          ${asideRelated}
        </div>
      </aside>
    </div>
  </section>

  <section class="section section--sand process">
    <div class="container">
      ${sectionHead({
        tag: "طريقة العمل",
        title: "من القياس<br><em>إلى التسليم</em>",
        lead: "كل مرحلة واضحة، وكل تفصيلة تُراجع قبل الانتقال للتي بعدها.",
        center: true,
      })}
      ${processGrid()}
    </div>
  </section>

  <section class="section related-services">
    <div class="container">
      ${sectionHead({
        tag: "استكشف أيضًا",
        title: "خدمات<br><em>قد تحتاجها</em>",
      })}
      <div class="related-grid">
        ${related
          .map(
            (s) => `<a class="related-card reveal" href="/services/${s.slug}.html">
          <span class="related-card__icon">${ICONS[s.icon]}</span>
          <h3>${s.title}</h3>
          <p>${s.short}</p>
          <span class="related-card__link">${ICONS.arrow}</span>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "جاهز لتنفيذ<br><em>${service.title}؟</em>",
    text: "أرسل لنا تفاصيل المكان، وسنحدد معك نوع الزجاج والقياسات والموعد المناسب.",
    imageName: service.image,
  })}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    content,
    imageName: service.image,
    schemas: [
      organizationSchema(),
      serviceSchema(service),
      breadcrumbSchema(crumbs, `/services/${service.slug}.html`),
      faqSchema(service.faqs),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: abs(`/services/${service.slug}.html`),
        name: service.metaTitle,
        description: service.metaDescription,
        isPartOf: { "@id": `${SITE.domain}/#website` },
        primaryImageOfPage: abs(`/assets/images/${service.image}.jpg`),
        inLanguage: "ar",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Sitemap / robots / manifest                                         */
/* ------------------------------------------------------------------ */

function buildSitemap() {
  const urls = [
    { loc: "/", priority: "1.0", images: ["office-black-frame", "office-frosted-2", "storefront-install", "shower-install"] },
    { loc: "/about.html", priority: "0.8", images: ["office-construction", "office-black-frame"] },
    { loc: "/services.html", priority: "0.9", images: ["office-black-2"] },
    { loc: "/projects.html", priority: "0.9", images: PROJECTS.map((p) => p.image) },
    { loc: "/faq.html", priority: "0.7", images: ["shower-install"] },
    { loc: "/contact.html", priority: "0.8", images: ["storefront-install"] },
    { loc: "/privacy.html", priority: "0.3", images: [] },
    ...SERVICES.map((s) => ({
      loc: `/services/${s.slug}.html`,
      priority: "0.9",
      images: [s.image, ...s.gallery],
    })),
  ];

  const entries = urls
    .map(
      (u) => `<url>
    <loc>${abs(u.loc)}</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
    ${[...new Set(u.images)]
      .map(
        (img) => `<image:image>
      <image:loc>${abs(`/assets/images/${img}.jpg`)}</image:loc>
      <image:title>${esc(MANIFEST[img]?.alt ?? "مشروع من أعمال مؤسسة ريم النفوذ")}</image:title>
    </image:image>`
      )
      .join("\n    ")}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /
Disallow: /tools/

Sitemap: ${abs("/sitemap.xml")}
`;
}

function buildManifest() {
  return JSON.stringify(
    {
      name: SITE.name,
      short_name: SITE.shortName,
      description: "تفصيل وتركيب الزجاج السكريت والألمنيوم والواجهات الزجاجية في الرياض والمملكة العربية السعودية.",
      lang: "ar",
      dir: "rtl",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#fbfaf7",
      theme_color: "#08141f",
      icons: [
        { src: "/assets/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/assets/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/assets/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    null,
    2
  );
}

/* ------------------------------------------------------------------ */
/* Run                                                                 */
/* ------------------------------------------------------------------ */

const home = homePage();
writePage("/", home);
writePage("/about.html", aboutPage());
writePage("/services.html", servicesPage());
writePage("/projects.html", projectsPage());
writePage("/faq.html", faqPage());
writePage("/contact.html", contactPage());
writePage("/privacy.html", privacyPage());

for (const service of SERVICES) {
  writePage(`/services/${service.slug}.html`, servicePage(service));
}

const notFound = notFoundPage();
const nfHtml = `${head({
  title: notFound.title,
  description: notFound.description,
  canonicalPath: "/404.html",
  schemas: [],
  noindex: true,
})}
${header("/404.html")}
<main id="main">${notFound.content}</main>
${footer()}
${floating()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
fs.writeFileSync(path.join(ROOT, "404.html"), nfHtml, "utf8");
console.log("wrote 404.html");

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), buildSitemap(), "utf8");
fs.writeFileSync(path.join(ROOT, "robots.txt"), buildRobots(), "utf8");
fs.writeFileSync(path.join(ROOT, "manifest.webmanifest"), buildManifest(), "utf8");
console.log("wrote sitemap.xml, robots.txt, manifest.webmanifest");
