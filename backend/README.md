# Kavitha Sweets & Bakery — Laravel 12 REST API + Admin Panel

Backend for **Kavitha Sweets & Bakery** (`கவிதா இனிப்புகள் மற்றும் அடுமனை`), Lakshmangudi, Tamil Nadu.

- **Stack:** Laravel 12 · MySQL · Laravel Sanctum (token auth)
- **Deliverables:** REST API for the React frontend + a full server-rendered admin panel (Blade + Tailwind CDN)
- **Image storage:** local `public` disk (`php artisan storage:link`)

> The source in this folder is designed to be merged into a fresh Laravel 12 install.
> PHP 8.2+ and Composer are required.

---

## 1. Quick Start

```bash
# Scaffold a fresh Laravel 12 app
composer create-project laravel/laravel:^12.0 backend
cd backend

# Add Sanctum for token (JWT-style) API auth
composer require laravel/sanctum

# Copy this project's files over the scaffold (app, routes, database, resources/views/admin, bootstrap/app.php, composer.json, .env.example)
```

Copy the files from this `backend/` folder into the new `backend/` folder, overwriting the scaffold:

```
app/
bootstrap/app.php
composer.json
database/
resources/views/admin/
routes/api.php
routes/web.php
.env.example
```

> Do **not** overwrite `public/` or `config/` from the scaffold (keep Laravel's defaults).
> `composer.json` and `bootstrap/app.php` from this repo add Sanctum + the `admin` middleware alias.

## 2. Environment & Database

```bash
cp .env.example .env
php artisan key:generate
```

Update `.env`:

```env
APP_NAME="Kavitha Sweets & Bakery"
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_DATABASE=kavitha_bakery
DB_USERNAME=root
DB_PASSWORD=
CACHE_STORE=database
QUEUE_CONNECTION=database
SESSION_DRIVER=database
```

Create the database, then run:

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

`db:seed` creates:

| Type | Value |
|------|-------|
| Admin user | `admin@kavithasweets.in` / `kavitha@2024` |
| Demo customer | `customer@example.com` / `password` |
| 8 categories, 12 products, 12 gallery items, 8 approved reviews, site settings/SEO | — |

## 3. Run

```bash
php artisan serve
```

- **Admin panel:** `http://localhost:8000/admin`
- **Health check:** `http://localhost:8000/up`
- **API base:** `http://localhost:8000/api`

## 4. API Overview

### Public (no auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings` | Site settings for the frontend |
| GET | `/api/categories` | Active categories + product counts |
| GET | `/api/products` | Products (filters: `category`, `q`, `best_seller`, `sort`, `dir`, `per_page`) |
| GET | `/api/products/{product}` | Single product |
| GET | `/api/gallery` | Gallery images |
| GET | `/api/banners` | Active banners |
| GET | `/api/reviews` | Approved reviews |
| POST | `/api/reviews` | Submit a review (goes to pending) |
| POST | `/api/enquiries` | Submit a customer enquiry |
| POST | `/api/register` | Customer registration |
| POST | `/api/login` | Login → returns `token` |

### Authenticated customer (Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/logout` | Revoke token |
| GET | `/api/me` | Current user |
| GET | `/api/my-orders` | Customer's orders |
| POST | `/api/orders` | Place order (`items` array) |

### Admin (`Bearer token` + `role=admin`)

All prefixed with `/api/admin`, guarded by the `admin` middleware. Handles products, categories, orders (list/status), gallery, reviews (approve/delete), banners, enquiries (status/delete), settings, and a dashboard stats endpoint.

**Example order payload:**

```json
{
  "customer_name": "Priya Ramesh",
  "phone": "9876543210",
  "address": "45 Hospital Road, Lakshmangudi",
  "city": "Koothanallur",
  "items": [
    { "product_id": 1, "name": "Chocolate Cake", "quantity": 1, "price": 450 }
  ]
}
```

**Example login response:**

```json
{ "message": "Logged in successfully.", "token": "1|abc...", "user": { "id": 1, "name": "...", "role": "admin" } }
```

Send the token as: `Authorization: Bearer <token>`.

## 5. Connecting the React Frontend

In `../frontend/src/data/site.js` (or a `.env` on the React side), point your API calls at:

```
http://localhost:8000/api
```

CORS: in production, update `config/cors.php` with your frontend origin. The API currently returns public content so the marketing site works without auth; customer login/orders need the token flow above.

## 6. Image Uploads

Product / category / gallery / banner images are stored under `storage/app/public/...` and served via `storage/...` URLs. Run `php artisan storage:link` once after deploy.

## 7. Security Notes (before production)

- Change the seeded admin password immediately.
- Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://…`.
- Use HTTPS and set `SESSION_SECURE_COOKIE` / `SANCTUM` guards accordingly.
- Rate-limit public POST endpoints (`throttle:api`) if desired.
