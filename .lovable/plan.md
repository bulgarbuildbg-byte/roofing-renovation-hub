

## Дизайн + Съдържание — „Как работим" секция и страница

### Промени

**1. `src/components/HowWeWork.tsx` — Homepage секция**
- Иконки: `HardHat` → `ClipboardCheck` (инспекция/чеклист), `FileText` остава (оферта), `Wrench` → `Hammer` (строителство), `ShieldCheck` → `Award` (сертификат/гаранция)
- Стъпкови номера: увеличени до `w-14 h-14 text-2xl`, с gradient background (`bg-gradient-to-br from-primary to-primary/80`) и по-голям shadow
- Benefits: 3 зелени check-а на всяка стъпка (вместо 1) с обновен текст
- Бутон: от `variant="outline"` → `variant="default"` (primary цвят, ясно видим)
- Карти: добавяне на цветен горен бордер (`border-t-4 border-primary`) за premium вид
- Иконков кръг: по-голям (`w-20 h-20`), по-наситен фон (`bg-primary/15`)

**2. `src/pages/HowWeWorkPage.tsx` — Подробна страница**
- Иконки: синхронизиране с homepage (`ClipboardCheck`, `FileText`, `Hammer`, `Award`)
- Bullet checkmarks: от `text-primary` → `text-green-600` (зелени, както иска потребителят)
- CTA секция бутони: запазване на текущия fix (бял телефонен бутон с `text-primary`)
- Иконков кръг: по-наситен фон, по-голям step number badge

**3. i18n — обновени benefit ключове (всички 10 locale файла)**

Нови ключове за 3 benefits на стъпка:

| Стъпка | BG текст |
|---|---|
| step1Benefit1 | Безплатен оглед |
| step1Benefit2 | Професионална консултация |
| step1Benefit3 | Ясна оценка на проблема |
| step2Benefit1 | Без скрити разходи |
| step2Benefit2 | Ясно ценообразуване |
| step2Benefit3 | Детайлен обхват на работа |
| step3Benefit1 | Подписан договор |
| step3Benefit2 | Качествено изпълнение |
| step3Benefit3 | Изпълнение в срок |
| step4Benefit1 | Приемо-предавателен протокол |
| step4Benefit2 | До 10–15 години гаранция |
| step4Benefit3 | Подкрепа след завършване |

Старите `step1Benefit`, `step2Benefit` и т.н. се заменят с `step1Benefit1/2/3` и т.н.

### Файлове за промяна

| Файл | Действие |
|---|---|
| `src/components/HowWeWork.tsx` | Нови икони, по-големи номера, 3 benefits/стъпка, primary бутон, premium карти |
| `src/pages/HowWeWorkPage.tsx` | Нови икони, зелени checkmarks, синхронизиран дизайн |
| `src/i18n/locales/bg.ts` | 12 нови benefit ключове (3×4), премахване на старите |
| `src/i18n/locales/en.ts` | Същото |
| `src/i18n/locales/de.ts` | Същото |
| `src/i18n/locales/fi.ts` | Същото |
| `src/i18n/locales/fr.ts` | Същото |
| `src/i18n/locales/nl.ts` | Същото |
| `src/i18n/locales/no.ts` | Същото |
| `src/i18n/locales/ru.ts` | Същото |
| `src/i18n/locales/sv.ts` | Същото |
| `src/i18n/locales/ua.ts` | Същото |

