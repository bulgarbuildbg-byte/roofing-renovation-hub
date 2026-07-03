## Диагноза

В кода вече няма повторно `gtag conversion` на thank-you страницата и обажданията са коректни. Най-вероятният оставащ източник за „2 конверсии“ при форма е, че сайтът изпраща едновременно:

1. директен Google Ads `conversion` към `AW-.../quote_submit`;
2. GA4 `generate_lead` event от същия helper.

Ако `generate_lead` е импортнат в Google Ads като Primary conversion, Google Ads ще отчете същото запитване втори път, въпреки че от кода има само едно директно Ads conversion събитие.

## План за корекция

1. **Да не променям обажданията**
   - Оставям `call_click` както е, защото вече отчита 1 конверсия.

2. **Да разделя Google Ads conversion от GA4 lead event**
   - В `src/lib/conversions.ts` ще премахна/спра `gtag("event", "generate_lead", ...)` от `fireLeadConversion` за формите.
   - Ще остане само директният Google Ads `conversion` към `quote_submit`.
   - Така Tag Assistant няма да показва `Generate Lead` като втори потенциален conversion hit при submit на форма.

3. **Да оставя вътрешната CRM аналитика непокътната**
   - `trackEvent(...)`, записите в базата, attribution данните и lead записите няма да се променят.

4. **Да добавя защита срещу double-submit**
   - В `QuoteRequestForm` и `MultiStepInquiryForm` ще добавя early return, ако `submitting === true`, за да не може двоен клик върху бутона да изпрати/отчете втори път преди React да заключи бутона.

5. **Проверка след промяната**
   - Ще проверя, че `gtag("event", "conversion")` съществува само в `src/lib/conversions.ts`.
   - Ще проверя, че `generate_lead` вече не се изпраща от формите.
   - Очакван резултат:
     - обаждане: 1 conversion;
     - попълнена форма от Google Ads: 1 conversion;
     - зареждане на страница без действие: 0 conversions, само remarketing/config hit.