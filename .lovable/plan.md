# Смяна на имейл адреса в целия сайт

## Цел
Замяна на `remontnapokrivivarna@abv.bg` с `remontnapokrivivarna@gmail.com` навсякъде във frontend кода, sitemap файловете и edge функциите.

## Обхват
Открити са 58 файла, които съдържат стария имейл — компоненти, страници, блог статии, sitemap-и, schema.org JSON-LD данни и Supabase edge функции (включително PDF генератора за оферти и chat асистента).

## Подход
Едно глобално търсене и замяна с `sed` върху всички съответстващи файлове (без `node_modules`). Това гарантира пълно покритие на:

- mailto: връзки във Footer, Contact, ContactPage и др.
- Schema.org `LocalBusiness` / `RoofingContractor` JSON-LD блокове
- Sitemap XML файлове (ако присъстват като контакт)
- Edge функции (chat системни промптове, PDF оферти/договори)
- Блог статии и градски страници

## Без промяна
- Дизайн, layout, бизнес логика
- Routes, превод на ключове
- База данни и RLS политики
- Други контактни данни (телефон, адрес)

## Технически детайли
Команда:
```bash
grep -rl "remontnapokrivivarna@abv.bg" --include="*.ts" --include="*.tsx" \
  --include="*.xml" --include="*.html" --include="*.json" --include="*.toml" . \
  | xargs sed -i 's/remontnapokrivivarna@abv\.bg/remontnapokrivivarna@gmail.com/g'
```

След това верификация с `grep -r "abv.bg"` за нула резултати.
