/** Home page variant static copy and asset paths. */

export const AGE_CATEGORIES = [
  { label: "0-6 Months", shape: "shape/shape-42.png" },
  { label: "6-12 Months", shape: "shape/shape-43.png" },
  { label: "1-2 Years", shape: "shape/shape-44.png" },
  { label: "2-4 Years", shape: "shape/shape-45.png" },
  { label: "4-6 Years", shape: "shape/shape-46.png" },
  { label: "6-10 Years", shape: "shape/shape-47.png" },
] as const;

export const POPULAR_BRANDS = [
  "brands/brands-1.png",
  "brands/brands-2.png",
  "brands/brands-3.png",
  "brands/brands-4.png",
  "brands/brands-5.png",
  "brands/brands-6.png",
] as const;

export const BANNER_TWO_SLIDES = [
  { title: "The Ultimate Baby Fashion Store", price: "$42.99", image: "banner/banner-img-2.png", bgClass: "bg-color-1" },
  { title: "The Ultimate Baby Fashion Store", price: "$42.99", image: "banner/banner-img-3.png", bgClass: "bg-color-2" },
  { title: "The Ultimate Baby Fashion Store", price: "$42.99", image: "banner/banner-img-4.png", bgClass: "bg-color-3" },
] as const;

export const BANNER_THREE_SLIDES = [
  { pattern: "shape/shape-1.jpg", accent: "shape/shape-58.png" },
  { pattern: "shape/shape-2.jpg", accent: "shape/shape-59.png" },
  { pattern: "shape/shape-3.jpg", accent: "shape/shape-60.png" },
] as const;

export const BANNER_TWO_INFO = [
  "Refer a Friend & Get 20% Off",
  "Subscribe and Get $10 Coupon",
  "Free Shipping + 30 Days Return",
] as const;

export const BANNER_THREE_TITLE = "Kids Toy Store Collection";

export const FEATURED_STYLE_THREE = [
  { eyebrow: "Featured", title: "Winter items", from: "$00.99", image: "resource/feature-7.png" },
  { eyebrow: "Hot Sale", title: "Classic Look", from: "$10.99", image: "resource/feature-8.png" },
  { eyebrow: "Latest Deals", title: "Modern Look", from: "$20.99", image: "resource/feature-9.png" },
] as const;

export const SHOP_ADS_BLOCKS = [
  {
    sectionClass: "shop-section shop-style-two pt_120 pb_110",
    pattern: "shape/shape-48.png",
    adsImage: "resource/ads-1.png",
    adsEyebrow: "Featured",
    adsTitle: "Kid Toy Collection for Summer",
    titleLead: "Top Selling",
    titleAccent: "products",
    carouselClass: "four-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one",
  },
  {
    sectionClass: "shop-section shop-style-four pt_120 pb_110",
    pattern: "shape/shape-48.png",
    adsImage: "resource/ads-2.png",
    adsEyebrow: "Stickers",
    adsTitle: "Summer",
    adsTitleAccent: "Collection",
    adsPrice: "$00.99",
    carouselClass: "three-item-carousel owl-carousel owl-theme owl-dots-none nav-style-one",
  },
] as const;

export const ACCOUNT_HISTORY = [
  {
    image: "resource/history-1.png",
    name: "Ultrasoft Stuffed Animal Plush Bunny",
    orderId: "#X469626",
    price: "$02.99",
    status: "Delivered",
  },
  {
    image: "resource/history-2.png",
    name: "Kids Musical Piano Developmental Toy",
    orderId: "#X469625",
    price: "$01.99",
    status: "Delivered",
  },
  {
    image: "resource/history-3.png",
    name: "Avengers Action Figure figurine Thano",
    orderId: "#X469629",
    price: "$05.99",
    status: "Delivered",
  },
] as const;
