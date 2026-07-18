/** Migration spec: maps each storefront route to source HTML and section stack. */

export type PageStatus = "done" | "partial" | "planned";

export type KiddexPageSpec = {
  slug: string;
  route: string;
  sourceHtml: string;
  pageComponent: string;
  sections: readonly string[];
  status: PageStatus;
  subscribe: boolean;
};

export const KIDDEX_PAGE_SPECS: readonly KiddexPageSpec[] = [
  {
    slug: "home",
    route: "/",
    sourceHtml: "index-2.html",
    pageComponent: "KiddexHomePage",
    sections: [
      "banner-style-two",
      "highlights-section",
      "category-style-two",
      "shop-section",
      "brands-section",
      "shop-style-three",
      "featured-style-three",
      "deals-style-two",
      "cta-section",
      "news-section",
    ],
    status: "done",
    subscribe: false,
  },
  {
    slug: "shop",
    route: "/shop",
    sourceHtml: "shop.html",
    pageComponent: "KiddexShopListingPage",
    sections: ["shop-page-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "shop-details",
    route: "/shop-details",
    sourceHtml: "shop-details.html",
    pageComponent: "KiddexProductDetailsPage",
    sections: ["shop-details", "featured-section", "related-product", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "cart",
    route: "/cart",
    sourceHtml: "cart.html",
    pageComponent: "KiddexCartPage",
    sections: ["page-title", "cart-section", "cta-section", "related-product", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "checkout",
    route: "/checkout",
    sourceHtml: "checkout.html",
    pageComponent: "KiddexCheckoutPage",
    sections: ["page-title", "checkout-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "order-confirmation",
    route: "/order-confirmation",
    sourceHtml: "checkout.html",
    pageComponent: "KiddexOrderConfirmationPage",
    sections: ["page-title", "order-confirmation-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "account-template",
    route: "/account-template",
    sourceHtml: "account.html",
    pageComponent: "KiddexAccountTemplatePage",
    sections: ["page-title", "account-section", "featured-style-two", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "compare",
    route: "/compare",
    sourceHtml: "account.html",
    pageComponent: "KiddexComparePage",
    sections: ["page-title", "compare-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "wishlist",
    route: "/wishlist",
    sourceHtml: "account.html",
    pageComponent: "KiddexWishlistPage",
    sections: ["page-title", "wishlist-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "about",
    route: "/about",
    sourceHtml: "about.html",
    pageComponent: "KiddexAboutPage",
    sections: [
      "page-title",
      "about-section",
      "slide-text",
      "brands-style-two",
      "testimonial-section",
      "highlights-section",
      "news-section",
      "subscribe-section",
    ],
    status: "done",
    subscribe: true,
  },
  {
    slug: "login",
    route: "/login",
    sourceHtml: "login.html",
    pageComponent: "KiddexSignPage",
    sections: ["page-title", "sign-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "signup",
    route: "/signup",
    sourceHtml: "signup.html",
    pageComponent: "KiddexSignPage",
    sections: ["page-title", "sign-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "error",
    route: "/error",
    sourceHtml: "error.html",
    pageComponent: "KiddexErrorPage",
    sections: ["page-title", "error-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "blog",
    route: "/blog",
    sourceHtml: "blog.html",
    pageComponent: "KiddexBlogPage",
    sections: ["page-title", "sidebar-page-container", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "blog-details",
    route: "/blog-details",
    sourceHtml: "blog-details.html",
    pageComponent: "KiddexBlogDetailsPage",
    sections: ["page-title", "sidebar-page-container", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
  {
    slug: "contact",
    route: "/contact",
    sourceHtml: "contact.html",
    pageComponent: "KiddexContactPage",
    sections: ["page-title", "contact-info-section", "contact-section", "subscribe-section"],
    status: "done",
    subscribe: true,
  },
] as const;

export function getPageSpec(slug: string): KiddexPageSpec | undefined {
  return KIDDEX_PAGE_SPECS.find((p) => p.slug === slug);
}
