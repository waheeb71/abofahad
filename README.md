# مؤسسة ريم النفوذ للزجاج السكريت والألمنيوم — الموقع

موقع تعريفي ثابت (HTML / CSS / JavaScript) باللغة العربية، متوافق مع الجوال، ومهيأ للفهرسة في محركات البحث.

## تشغيل الموقع محليًا

```powershell
cd "E:\projects\reem-alnufooth-glass"
python -m http.server 4173 --bind 127.0.0.1
```

ثم افتح: `http://127.0.0.1:4173/`

## تعديل المحتوى

كل بيانات الموقع (الهاتف، واتساب، الخدمات، الأعمال، الأسئلة الشائعة) في ملف واحد:

```
tools/site-data.mjs
```

بعد أي تعديل أعد بناء الصفحات:

```powershell
node tools/build.mjs
```

> لا تعدّل ملفات HTML مباشرة؛ فهي تُولّد من `tools/build.mjs` وستُستبدل عند البناء.

## تغيير اسم النطاق (مهم قبل الفهرسة)

اسم النطاق الحالي في ملف البيانات هو `https://reemalnufooth.com`.
عند شراء النطاق النهائي، عدّل سطرًا واحدًا فقط:

```js
// tools/site-data.mjs
domain: "https://your-domain.com",
```

ثم:

```powershell
node tools/build.mjs
```

سيتحدّث تلقائيًا: canonical، وروابط og:url، وsitemap.xml، وrobots.txt، وSchema.

## قبل الرفع

ارفع محتويات المجلد الجذر فقط:

```
404.html  about.html  contact.html  faq.html  index.html  privacy.html
projects.html  services.html  sitemap.xml  robots.txt  manifest.webmanifest
.htaccess  _headers  assets/  services/
```

**لا ترفع** مجلد `tools/` (ملفات البناء والصور الأصلية).

## الفهرسة — Google Search Console

1. افتح <https://search.google.com/search-console> وسجّل الدخول بحساب Google.
2. أضف الموقع بنوع **Domain** (يغطي `www` وبدونها وكل البروتوكولات) أو **URL prefix**.
3. تحقّق من الملكية بإحدى الطرق:
   - **Domain**: أضف سجل TXT في DNS (يوفّره مزوّد النطاق).
   - **URL prefix**: ارفع ملف التحقق `googleXXXX.html` إلى جذر الموقع، أو أضف وسم `<meta>` في `tools/build.mjs` ثم أعد البناء.
4. من القائمة الجانبية: **Sitemaps** → أضف `sitemap.xml` → إرسال.
5. من **URL Inspection**: الصق رابط الصفحة الرئيسية → **Request Indexing**.
6. كرّر طلب الفهرسة لصفحات الخدمات السبع وصفحات: من نحن، أعمالنا، الأسئلة الشائعة، تواصل معنا.
7. راقب تقرير **Pages** بعد 3–7 أيام. أول فهرسة لموقع جديد قد تستغرق من أيام إلى أسبوعين.

### بعد النشر تحقّق من

- `https://your-domain.com/robots.txt` يظهر ويحتوي رابط الـ sitemap.
- `https://your-domain.com/sitemap.xml` يفتح بدون خطأ XML.
- `https://your-domain.com/صفحة-غير-موجودة` تُرجع صفحة 404 (وليس الصفحة الرئيسية).
- إضافة الموقع إلى **Bing Webmaster Tools** (اختياري لكنه سريع الفهرسة).

## ما تم تجهيزه للفهرسة

- 14 صفحة قابلة للفهرسة + صفحة 404 بـ `noindex`.
- عنوان ووصف فريد لكل صفحة، وعنوان H1 واحد لكل صفحة.
- `canonical` و`og:url` متطابقان في كل صفحة.
- `sitemap.xml` صالح XML ويشمل 37 صورة مع عناوينها.
- `robots.txt` يسمح بالزحف ويشير إلى الـ sitemap.
- بيانات منظمة JSON-LD: LocalBusiness / HomeAndConstructionBusiness، Service، FAQPage، BreadcrumbList، WebSite، CollectionPage، ImageGallery.
- روابط تواصل: هاتف وواتساب فقط (بدون بريد إلكتروني).
- نتيجة Lighthouse SEO: **100/100** في الصفحات المفحوصة.

## الملفات الأساسية

| الملف | الوظيفة |
| --- | --- |
| `tools/site-data.mjs` | كل المحتوى وبيانات التواصل |
| `tools/build.mjs` | مولّد الصفحات والـ SEO |
| `assets/css/styles.css` | التنسيقات |
| `assets/js/main.js` | القائمة، المعرض، نموذج واتساب |
| `tools/process_assets.py` | ضغط الصور وتوليد الأيقونات |
| `tools/source-photos/` | الصور الأصلية (غير منشورة) |
