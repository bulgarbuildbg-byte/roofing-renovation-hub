## Цел

Да потвърдим с реален browser test, че текущата логика в `src/lib/conversions.ts` изпраща **точно 1 Google Ads Conversion** на едно реално lead действие — без дублиране.

## Какво ще направя (read-only, без промени по кода)

1. Стартирам Playwright headless срещу `http://localhost:8080/bg/varna` с viewport 1280×1800.
2. Прихващам всички network заявки към `googleadservices.com/pagead/conversion/`, `google.com/pagead/`, `google-analytics.com/g/collect`, `google.com/ccm/collect` — това са ендпойнтите, през които `gtag` изпраща conversions и GA4 events.
3. Изпълнявам три реални сценария и броя събитията отделно за всеки:
   - **A. Клик на телефонен бутон** (`tel:0893971873` в хедъра) → очаквано: 1× conversion към `AW-18066399675` с call label.
   - **B. Попълване и submit на Quote форма** (`/bg/zayavete-oferta` или главната inquiry форма) с тестови данни → очаквано: 1× conversion към `AW-18066399675` с form label + 1× `user_data` set преди него.
   - **C. PriceCalculator unlock** (въвеждане на телефон за отключване на цената) → очаквано: 1× conversion, без второ при финалния submit.
4. За всеки сценарий:
   - Броя POST-ове към `/pagead/conversion/AW-18066399675/` и групирам по conversion label.
   - Броя POST-ове към GA4 (`google-analytics.com/g/collect`) с `en=generate_lead` и `en=lead_engagement` — те трябва да са GA4-only (без `tid=AW-...`).
   - Проверявам, че НЯМА POST към `AW-17872435541` (стария акаунт).
   - Правя screenshot преди/след всяко действие в `/tmp/browser/ads-audit/`.
5. Извеждам таблица:

   ```text
   Action              | Ads Conversions | GA4 events | Ads accounts hit
   Call click          | ?               | ?          | ?
   Form submit         | ?               | ?          | ?
   Calculator unlock   | ?               | ?          | ?
   ```

## Възможни изходи

- **Всичко е 1×** → потвърждавам пред теб, че кодът е чист. Дублирането в Ads UI (ако още го виждаш) е от Ads Goals config (GA4 imports маркирани като Primary) — това не се фиксва в кода.
- **Някъде вижда 2×** → показвам ти точните URL-и на дублираните POST-ове, идентифицирам къде в кода се пали второто събитие и предлагам конкретна корекция (нов план).

## Технически бележки

- Тестът тръгва от `LOVABLE_BROWSER_AUTH_STATUS` = каквото е (не е нужна автентикация за публични страници и формите).
- Формата ще изпрати реален lead в `inquiries` — ще го маркирам с име `TEST_ADS_AUDIT` и телефон `0000000000`, за да може лесно да се изтрие след теста.
- Няма да пипам production tracking IDs.
