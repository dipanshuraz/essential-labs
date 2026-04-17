/**
 * Load Kiddex CSS the same way as the HTML pack (`<link href="assets/css/...">`).
 * Served from `/public/kiddex/...` so Next does not parse vendor CSS through PostCSS.
 */
const STYLESHEETS = [
  "/kiddex/assets/css/font-awesome-all.css",
  "/kiddex/assets/css/flaticon.css",
  "/kiddex/assets/css/owl.css",
  "/kiddex/assets/css/bootstrap.css",
  "/kiddex/assets/css/jquery.fancybox.min.css",
  "/kiddex/assets/css/animate.css",
  "/kiddex/assets/css/nice-select.css",
  "/kiddex/assets/css/elpath.css",
  "/kiddex/assets/css/jquery-ui.css",
  "/kiddex/assets/css/odometer.css",
  "/kiddex/assets/css/color.css",
  "/kiddex/assets/css/rtl.css",
  "/kiddex/assets/css/style.css",
  "/kiddex/assets/css/module-css/header.css",
  "/kiddex/assets/css/module-css/page-title.css",
  "/kiddex/assets/css/module-css/banner.css",
  "/kiddex/assets/css/module-css/highlights.css",
  "/kiddex/assets/css/module-css/category.css",
  "/kiddex/assets/css/module-css/shop.css",
  "/kiddex/assets/css/module-css/brands.css",
  "/kiddex/assets/css/module-css/featured.css",
  "/kiddex/assets/css/module-css/popular-product.css",
  "/kiddex/assets/css/module-css/deals.css",
  "/kiddex/assets/css/module-css/news.css",
  "/kiddex/assets/css/module-css/shop-sidebar.css",
  "/kiddex/assets/css/module-css/shop-page.css",
  "/kiddex/assets/css/module-css/shop-details.css",
  "/kiddex/assets/css/module-css/cart.css",
  "/kiddex/assets/css/module-css/checkout.css",
  "/kiddex/assets/css/module-css/login.css",
  "/kiddex/assets/css/module-css/about.css",
  "/kiddex/assets/css/module-css/contact.css",
  "/kiddex/assets/css/module-css/account.css",
  "/kiddex/assets/css/module-css/cta.css",
  "/kiddex/assets/css/module-css/subscribe.css",
  "/kiddex/assets/css/module-css/footer.css",
  "/kiddex/assets/css/responsive.css",
] as const;

export function KiddexStyleLinks() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
        rel="stylesheet"
      />
      {STYLESHEETS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
