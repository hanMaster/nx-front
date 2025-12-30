# Дополнительные рекомендации для SEO и безопасности

## ✅ Уже реализовано

### Безопасность
- ✅ Security Headers (CSP, X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ XSS защита через валидацию входных данных
- ✅ Error boundaries для graceful error handling
- ✅ Race condition protection в data layer
- ✅ Proper error handling с пробрасыванием в error.tsx

### SEO
- ✅ JSON-LD Structured Data (LocalBusiness schema)
- ✅ Dynamic sitemap.xml с автоматическим обновлением
- ✅ robots.txt с правильными настройками
- ✅ Динамические метаданные для всех страниц
- ✅ Open Graph теги для социальных сетей
- ✅ Правильные title templates
- ✅ Next.js caching с revalidation

---

## 📋 Рекомендации для ручной реализации

### 1. Alt текст для изображений (ВАЖНО для SEO и A11Y)

**Приоритет**: HIGH

Необходимо добавить осмысленные alt тексты для всех изображений:

**Файлы для обновления:**
```
src/app/page.tsx - основные изображения на главной
src/app/menu/[categoryId]/page.tsx - изображения категорий
src/components/service-item.tsx - изображения услуг
src/components/slider-home.tsx - слайдер изображения
```

**Пример исправления:**
```tsx
// ❌ Плохо
<Image src="/img/hero.jpg" alt="hero" />

// ✅ Хорошо
<Image
  src="/img/hero.jpg"
  alt="Детский праздник с аниматором в студии Характер - дети играют и веселятся"
/>
```

**Чек-лист:**
- [ ] Изображения на главной странице (page.tsx)
- [ ] Изображения категорий меню
- [ ] Изображения товаров/услуг
- [ ] Логотип в Header
- [ ] Изображения в Footer
- [ ] Изображения в слайдерах

---

### 2. Обновить адрес и контакты в LocalBusinessSchema

**Приоритет**: HIGH

**Файл**: `src/app/layout.tsx` (строки 67-83)

Заменить placeholder данные на реальные:
```tsx
<LocalBusinessSchema
    name="Детские студии Давай поиграем и Характер"
    description="..."
    url="https://kharakter.ru"
    telephone="+7 (XXX) XXX-XX-XX" // ← Заменить на реальный
    address={{
        streetAddress: "ул. Примерная, д. 1", // ← Заменить на реальный адрес
        addressLocality: "Находка",
        addressRegion: "Приморский край",
        postalCode: "692900", // ← Проверить индекс
        addressCountry: "RU",
    }}
    geo={{ // ← Добавить координаты для карт
        latitude: 42.8166,
        longitude: 132.8735,
    }}
    openingHours={[
        "Mo-Su 10:00-20:00", // ← Проверить часы работы
    ]}
/>
```

---

### 3. Добавить Canonical URLs

**Приоритет**: MEDIUM

Предотвращает дублирование контента в поисковых системах.

**Добавить в metadata каждой страницы:**
```tsx
export const metadata: Metadata = {
    title: "...",
    description: "...",
    alternates: {
        canonical: "https://kharakter.ru/current-page",
    },
};
```

---

### 4. Добавить BreadcrumbSchema для страниц

**Приоритет**: MEDIUM

Улучшает отображение в поисковой выдаче.

**Пример для страницы категории:**
```tsx
import { BreadcrumbSchema } from "@/components/StructuredData";

export default async function CategoryPage(props) {
    // ... код страницы

    return (
        <main>
            <BreadcrumbSchema
                items={[
                    { name: "Главная", url: "https://kharakter.ru" },
                    { name: "Меню", url: "https://kharakter.ru/menu" },
                    { name: category.title, url: `https://kharakter.ru/menu/${categoryId}` },
                ]}
            />
            {/* остальной контент */}
        </main>
    );
}
```

---

### 5. Оптимизация изображений

**Приоритет**: HIGH (влияет на Core Web Vitals)

**Что сделать:**

1. **Добавить priority для LCP изображений:**
```tsx
// На главной странице - первое видимое изображение
<Image
    src="/img/hero.jpg"
    alt="..."
    priority // ← Добавить!
    placeholder="blur"
    blurDataURL="data:image/..." // Генерировать автоматически
/>
```

2. **Добавить sizes для responsive изображений:**
```tsx
<Image
    src={item.imageWebp}
    alt={item.title}
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading="lazy"
/>
```

3. **Конвертировать все изображения в WebP:**
   - Использовать `next/image` автоматическую оптимизацию
   - Или конвертировать вручную через imagemagick/sharp

---

### 6. Rate Limiting (для Production)

**Приоритет**: HIGH для безопасности

**Установить библиотеку:**
```bash
npm install @upstash/ratelimit @upstash/redis
```

**Создать файл:** `src/lib/ratelimit.ts`
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 запросов за 10 секунд
    analytics: true,
});
```

**Использовать в API routes или Server Actions:**
```typescript
const ip = headers().get("x-forwarded-for") ?? "unknown";
const { success } = await ratelimit.limit(ip);

if (!success) {
    throw new Error("Too many requests");
}
```

---

### 7. Environment Variables Security

**Приоритет**: CRITICAL

**Создать файл:** `.env.example`
```env
# API Configuration
API_BASE_URL=http://localhost:5001/api/v1/
API_SECRET_KEY=your-secret-key-here

# Selectel CDN
NEXT_PUBLIC_CDN_URL=https://102922.selcdn.ru

# Analytics (опционально)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_YANDEX_METRIKA_ID=XXXXXXXX
```

**В production:**
- Использовать environment variables для секретов
- Никогда не коммитить `.env` в git
- Использовать `NEXT_PUBLIC_` prefix только для публичных переменных

---

### 8. HTTPS и SSL

**Приоритет**: CRITICAL для production

**Vercel/Netlify:** Автоматически настроено ✅

**Самостоятельный хостинг:**
1. Получить SSL сертификат (Let's Encrypt бесплатно)
2. Настроить редирект с HTTP на HTTPS
3. Убедиться что `Strict-Transport-Security` header работает

---

### 9. Analytics Integration

**Приоритет**: MEDIUM

**Google Analytics 4:**
```tsx
// src/app/layout.tsx
import Script from 'next/script';

// В <head>:
<Script
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
    strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `}
</Script>
```

**Yandex Metrika:**
```tsx
<Script id="yandex-metrika" strategy="afterInteractive">
    {`
        (function(m,e,t,r,i,k,a){
            // ... код Яндекс.Метрики
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    `}
</Script>
```

---

### 10. Cookie Consent (GDPR/CCPA)

**Приоритет**: HIGH для международных пользователей

**Установить:**
```bash
npm install react-cookie-consent
```

**Добавить в layout:**
```tsx
import CookieConsent from "react-cookie-consent";

// В body:
<CookieConsent
    location="bottom"
    buttonText="Принять"
    declineButtonText="Отклонить"
    cookieName="kharakter-cookie-consent"
    style={{ background: "#2B373B" }}
    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
    expires={150}
>
    Этот сайт использует cookies для улучшения пользовательского опыта.{" "}
    <a href="/policy" style={{ color: "#fff" }}>Политика конфиденциальности</a>
</CookieConsent>
```

---

### 11. Performance Monitoring

**Приоритет**: MEDIUM

**Web Vitals tracking:**
```tsx
// src/app/layout.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
    useReportWebVitals((metric) => {
        // Отправлять в Google Analytics, Vercel Analytics, или свой сервис
        if (window.gtag) {
            window.gtag('event', metric.name, {
                value: Math.round(metric.value),
                event_label: metric.id,
                non_interaction: true,
            });
        }
    });
}
```

---

### 12. Добавить FAQ Schema

**Приоритет**: LOW

Улучшает rich snippets в Google.

**Создать компонент:**
```tsx
// src/components/StructuredData.tsx
export function FAQSchema({ items }: { items: Array<{question: string; answer: string}> }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
```

---

## 🔍 Тестирование

### SEO тесты:
1. **Google Search Console**: https://search.google.com/search-console
   - Проверить индексацию
   - Проверить мобильную версию
   - Проверить Core Web Vitals

2. **Structured Data Testing Tool**: https://validator.schema.org/
   - Проверить JSON-LD разметку

3. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Проверить производительность
   - Цель: >90 для Desktop, >80 для Mobile

4. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### Безопасность тесты:
1. **Security Headers**: https://securityheaders.com/
   - Цель: A+ рейтинг

2. **SSL Labs**: https://www.ssllabs.com/ssltest/
   - Цель: A или A+ рейтинг

3. **OWASP ZAP**: Сканирование на уязвимости

---

## 📊 Приоритеты реализации

### CRITICAL (сделать немедленно):
1. ✅ Security headers (DONE)
2. ✅ XSS protection (DONE)
3. Обновить реальные контакты в LocalBusinessSchema
4. HTTPS enforcement (если не на Vercel)
5. Environment variables protection

### HIGH (сделать в ближайшее время):
1. Alt тексты для всех изображений
2. Image optimization (priority, sizes, webp)
3. Rate limiting для production
4. Canonical URLs

### MEDIUM (следующий спринт):
1. BreadcrumbSchema для всех страниц
2. Analytics integration
3. Cookie consent
4. Performance monitoring

### LOW (когда будет время):
1. FAQ schema
2. Review/Rating schema
3. Дополнительные structured data типы

---

## 📝 Чек-лист перед деплоем в production

- [ ] Все placeholder данные заменены на реальные
- [ ] SSL сертификат установлен
- [ ] Environment variables настроены
- [ ] Security headers работают (проверить на securityheaders.com)
- [ ] Sitemap доступен и правильный
- [ ] robots.txt правильно настроен
- [ ] Google Search Console настроен
- [ ] Yandex Webmaster настроен
- [ ] Analytics работает
- [ ] Cookie consent добавлен
- [ ] Все изображения имеют alt тексты
- [ ] Core Web Vitals > 75 (проверить в PageSpeed Insights)
- [ ] Мобильная версия работает корректно
- [ ] Все формы валидируются
- [ ] Error boundaries тестированы
- [ ] Rate limiting работает

---

**Обновлено**: ${new Date().toISOString().split('T')[0]}

Как протестировать схемы:

После деплоя на production:

1. Schema.org Validator: https://validator.schema.org/
  - Вставить URL страницы товара/услуги
  - Проверить валидность JSON-LD
2. Google Rich Results Test: https://search.google.com/test/rich-results
  - Вставить URL
  - Посмотреть предпросмотр rich snippet
3. Google Search Console:
  - После индексации смотреть раздел "Enhancements"
  - Проверять ошибки в Product/Service разметке
