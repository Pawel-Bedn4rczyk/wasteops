# WasteOps

Prosty system do zarządzania urządzeniami i awariami w firmie.

Użytkownicy mogą przeglądać urządzenia, zgłaszać awarie, zmieniać statusy, komentować oraz śledzić historię zdarzeń. Dostęp jest ograniczony rolami (admin, technik, operator).

## Stack

**Backend**
- PHP 8.5 / Laravel 13
- Eloquent, migracje, policies
- Laravel Fortify (logowanie)
- Spatie Laravel Permission (role i uprawnienia)

**Frontend**
- Inertia.js v3 + React + TypeScript
- Tailwind CSS
- Laravel Wayfinder

**Środowisko**
- Laravel Sail (Docker)
- MySQL 8

## Wymagania

- Docker Desktop (lub Docker Engine + Compose)
- Git

## Uruchomienie (Sail)

### 1. Sklonuj projekt i wejdź do katalogu

```bash
git clone <url-repozytorium> wasteops
cd wasteops
```

### 2. Zainstaluj zależności PHP

```bash
docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v "$(pwd):/var/www/html" \
  -w /var/www/html \
  laravelsail/php85-composer:latest \
  composer install --ignore-platform-reqs
```

### 3. Skonfiguruj środowisko

```bash
cp .env.example .env
```

Dla Sail ustaw w `.env` m.in.:

```env
APP_NAME=WasteOps
APP_URL=http://localhost
APP_LOCALE=pl

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```

### 4. Uruchom kontenery

```bash
./vendor/bin/sail up -d
```

### 5. Wygeneruj klucz aplikacji, migracje i dane startowe

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
```

`key:generate` ustawia `APP_KEY` w `.env` (potrzebny m.in. do sesji i cookie). Pomiń ten krok, jeśli klucz już istnieje.

### 6. Frontend

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

### 7. Wejdź do aplikacji

- Aplikacja: [http://localhost](http://localhost)
- Logowanie: [http://localhost/login](http://localhost/login)

## Konta po seedzie

| Rola     | Email                    | Hasło      |
| -------- | ------------------------ | ---------- |
| Admin    | `admin@wasteops.test`    | `password` |
| Technik  | `technik@wasteops.test`  | `password` |
| Operator | `operator@wasteops.test` | `password` |

## Role (skrót)

- **Admin** — pełny dostęp (urządzenia, awarie, statusy, komentarze, usuwanie)
- **Technik** — podgląd, zmiana statusu awarii, komentarze
- **Operator** — podgląd, zgłaszanie awarii, komentarze

## Przydatne komendy

```bash
./vendor/bin/sail up -d
./vendor/bin/sail down
./vendor/bin/sail artisan migrate:fresh --seed
./vendor/bin/sail npm run build
```
