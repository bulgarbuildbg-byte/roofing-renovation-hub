

## Промени в hero секцията на „Нов покрив" — badges на един ред + деплой

### Проблем 1: Малките бутони (badges) не са на един ред
Ред 220: `flex flex-wrap gap-4` позволява пренасяне на нов ред. Трябва да се промени на `flex flex-nowrap gap-3` и да се намалят padding-ите (`px-3 py-1.5`) и текста (`text-xs md:text-sm`), за да се събират на един ред.

### Проблем 2: Промените не се виждат на домейна
Промените са само в preview. Трябва да публикувате проекта отново от Lovable, за да се отразят на production домейна.

### Промени във файл: `src/pages/services/NewRoofPage.tsx`

**Ред 220** — контейнер на badges:
- `flex flex-wrap gap-4 mb-10 text-sm md:text-base` → `flex flex-nowrap gap-3 mb-10 text-xs md:text-sm`

**Редове 221-236** — всеки badge:
- `px-4 py-2` → `px-3 py-1.5`

### Относно домейна
След одобрение на промените, трябва да натиснете бутона **Publish** в Lovable, за да се отразят на production сайта.

