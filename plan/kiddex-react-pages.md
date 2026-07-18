# Kiddex → React page migration

React implementation: `panda-bamboo/components/kiddex/`  
Theme assets: `panda-bamboo/public/kiddex/assets/`  
Optional HTML reference (repo root): `Kiddex/*.html`

## Architecture

```
components/kiddex/
├── layout/          Header, footer, cart, preloader (shared chrome)
├── pages/           One exported page component per route
├── sections/
│   ├── home/        index, index-2 … index-5 blocks
│   ├── shop/        catalog, product details, cart, checkout
│   ├── blog/
│   └── shared/      subscribe, cta band, related products
├── shop/            Product card, catalog toolbar
└── ui/              BgDiv, small helpers
```

Each **page** composes **sections** only — no HTML files, no parsers.

## Page checklist (27 routes)

| Route | Source HTML | Page component | Status |
|-------|-------------|--------------|--------|
| `/` | index.html | `KiddexHomePage` | In progress — 8/10 sections |
| `/index-2` | index-2.html | `KiddexHomePage` variant 2 | Planned — 12 sections |
| `/index-3` | index-3.html | `KiddexHomePage` variant 3 | Planned |
| `/index-4` | index-4.html | `KiddexHomePage` variant 4 | Planned |
| `/index-5` | index-5.html | `KiddexHomePage` variant 5 | Planned |
| `/about` | about.html | `KiddexAboutPage` | Done |
| `/shop` | shop.html | `KiddexShopListingPage` | In progress |
| `/shop-2` … `/shop-6` | shop-*.html | `KiddexShopListingPage` | In progress |
| `/shop-details` … `-*` | shop-details*.html | `KiddexProductDetailsPage` | Partial |
| `/cart` | cart.html | `KiddexCartPage` | In progress |
| `/checkout` | checkout.html | `KiddexCheckoutPage` | Partial |
| `/search` | search.html | `KiddexSearchPage` | Partial |
| `/blog` | blog.html | `KiddexBlogPage` | Done |
| `/blog-2` | blog-2.html | `KiddexBlogPage` | Done |
| `/blog-details` | blog-details.html | `KiddexBlogDetailsPage` | Done |
| `/contact` | contact.html | `KiddexContactPage` | Done |
| `/login` | login.html | `KiddexSignPage` | Done |
| `/signup` | signup.html | `KiddexSignPage` | Done |
| `/error` | error.html | `KiddexErrorPage` | Partial — add subscribe |
| `/account` | account.html | `KiddexAccountTemplatePage` | Planned |

## Section inventory (index.html)

1. `banner-section` → `BannerSection`
2. `category-section` → `CategorySection`
3. `featured-section` → `FeaturedSection`
4. `popular-product` → `PopularProductsSection`
5. `deals-section` → `DealsSection`
6. `shop-section` → `HomeShopPreviewSection`
7. `featured-style-two` → `FeaturedStyleTwoSection`
8. `collection-section` → `CollectionSection`
9. `testimonial-section` → `HomeTestimonialSection`
10. `news-section` → `KiddexNewsSection`

## Implementation order

1. **Shared** — subscribe, CTA band, related products, page spec
2. **Home v1** — finish remaining sections
3. **Shop family** — listing variants + subscribe
4. **Cart / checkout** — full section stack
5. **Product details** — variants + related
6. **Home v2–v5** — one variant per sprint
7. **Account template** — theme account page

## Regenerating from HTML

Do not auto-parse. When the theme HTML changes, manually update the matching section component and check classes against `Kiddex/*.html` at the repo root.
