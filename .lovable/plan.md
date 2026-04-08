

## Промени в секцията с отзиви

### 1. Смяна на снимки (fallback testimonials)

В `src/components/Testimonials.tsx`:

- **Мария Колева** (id "3"): `avatar_url` от `?img=5` → `?img=32` (бяла жена)
- **Николай Василев** (id "6"): `avatar_url` от `?img=14` → `?img=53` (бял мъж)
- **Георги Петров** (id "4"): `avatar_url` от `?img=8` → `?img=59` (бял мъж)

Също ще обновим `maleAvatarIds` и `femaleAvatarIds` масивите — ще махнем ID-тата, които не показват бели хора, за да се избегне проблемът и при auto-generated аватари от DB.

### 2. Каруселът да е центриран

Промяна на Embla конфигурацията:
- `align: "start"` → `align: "center"`

Това ще центрира активните карти в средата на контейнера.

### Файлове

| Файл | Промяна |
|---|---|
| `src/components/Testimonials.tsx` | 3 avatar URL-а + carousel align center |

