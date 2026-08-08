# Kavitha Sweets & Bakery
### கவிதா இனிப்புகள் மற்றும் அடுமனை

Premium, production-ready website for **Kavitha Sweets & Bakery** — 45, 46 Hospital Road, Lakshmangudi, Koothanallur, Tamil Nadu 614102. · 4.1★ (394 Google reviews) · +91 99651 55006

```
bakery/
├── frontend/   React 18 + Vite + Tailwind CSS + Framer Motion + Swiper + Lucide
└── backend/    Laravel 12 REST API (Sanctum auth) + Blade admin panel + MySQL
```

---

## Frontend — `frontend/`

Premium marketing site with hero, about, categories, best sellers, special cakes, why-choose-us, reviews, masonry gallery, order process, contact + Google Map, floating WhatsApp/call buttons, sticky navbar, scroll/counter/hover animations, lazy-loaded sections, SEO meta + JSON-LD schema.

**Run**

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

**Pages:** `/` (Home) · `/menu` (full menu with category filters) · `/about` · `/contact` · 404.

**Key files**

| Path | Purpose |
|------|---------|
| `src/data/site.js` | Business info (phone, WhatsApp, address, map embed, links) |
| `src/data/products.js` | Catalogue data (12 products, prices, ratings) |
| `src/data/categories.js` | 8 featured categories |
| `src/data/gallery.js` / `testimonials.js` / `specialCakes.js` | Gallery, reviews & special cakes |
| `src/components/*` | Section components (reusable across pages) |
| `src/components/ui/*` | `Img` (lazy + error fallback), `Reveal`, `SectionHeading`, `StarRating`, `ProductCard` |
| `src/hooks/useCountUp.js` | Counter animation |
| `index.html` | SEO meta tags + JSON-LD Bakery schema |

All prices/images are easily editable in the data files; swapping in real photos only requires updating the image URLs.

## Backend — `backend/`

Full setup + API reference in [`backend/README.md`](backend/README.md). Laravel 12 + MySQL with:
- Sanctum token auth (register / login / logout / me)
- Public endpoints: products, categories, gallery, banners, reviews, settings, enquiries
- Customer endpoints: place orders, my orders
- Admin endpoints: full CRUD for products, categories, gallery, reviews, banners, enquiries, orders status, settings & SEO
- Seeders for categories, products, admin user, settings, gallery, reviews
- Server-rendered admin panel at `/admin` (Dashboard, Products, Categories, Orders, Gallery, Reviews, Banners, Enquiries, Settings/SEO)

## Tech stack

- **Frontend:** React.js + Vite · Tailwind CSS · Framer Motion · Lucide React · SwiperJS
- **Backend:** Laravel 12 REST API · MySQL
- **Auth:** Laravel Sanctum tokens (API) + session auth (admin panel)
- **Design:** Deep red `#8B0000` · Gold `#FFD700` · Cream `#FFF8F2` · White cards · Golden buttons · Dark brown text · Playfair Display + Poppins
