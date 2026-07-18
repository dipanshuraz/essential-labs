/** All Kiddex template stylesheets (matches union of every HTML page head). */
const BASE = "/kiddex/assets/css";

export const KIDDEX_CORE_STYLES = [
  `${BASE}/font-awesome-all.css`,
  `${BASE}/flaticon.css`,
  `${BASE}/owl.css`,
  `${BASE}/bootstrap.css`,
  `${BASE}/jquery.fancybox.min.css`,
  `${BASE}/animate.css`,
  `${BASE}/nice-select.css`,
  `${BASE}/elpath.css`,
  `${BASE}/odometer.css`,
  `${BASE}/jquery-ui.css`,
  `${BASE}/color.css`,
  `${BASE}/rtl.css`,
  `${BASE}/style.css`,
] as const;

export const KIDDEX_MODULE_STYLES = [
  `${BASE}/module-css/header.css`,
  `${BASE}/module-css/banner.css`,
  `${BASE}/module-css/category.css`,
  `${BASE}/module-css/featured.css`,
  `${BASE}/module-css/popular-product.css`,
  `${BASE}/module-css/deals.css`,
  `${BASE}/module-css/shop.css`,
  `${BASE}/module-css/collection.css`,
  `${BASE}/module-css/testimonial.css`,
  `${BASE}/module-css/news.css`,
  `${BASE}/module-css/footer.css`,
  `${BASE}/module-css/page-title.css`,
  `${BASE}/module-css/about.css`,
  `${BASE}/module-css/brands.css`,
  `${BASE}/module-css/highlights.css`,
  `${BASE}/module-css/subscribe.css`,
  `${BASE}/module-css/shop-sidebar.css`,
  `${BASE}/module-css/shop-page.css`,
  `${BASE}/module-css/shop-details.css`,
  `${BASE}/module-css/cart.css`,
  `${BASE}/module-css/checkout.css`,
  `${BASE}/module-css/account.css`,
  `${BASE}/module-css/login.css`,
  `${BASE}/module-css/contact.css`,
  `${BASE}/module-css/error.css`,
  `${BASE}/module-css/blog-page.css`,
  `${BASE}/module-css/blog-sidebar.css`,
  `${BASE}/module-css/cta.css`,
  `${BASE}/module-css/ads.css`,
  `${BASE}/module-css/instagram.css`,
  `${BASE}/module-css/fluid.css`,
  `${BASE}/responsive.css`,
] as const;

/** Project overrides — must load LAST to win the cascade. */
export const KIDDEX_OVERRIDE_STYLES = [`${BASE}/kiddex-overrides.css`] as const;

export const KIDDEX_STYLES = [
  ...KIDDEX_CORE_STYLES,
  ...KIDDEX_MODULE_STYLES,
  ...KIDDEX_OVERRIDE_STYLES,
] as const;
