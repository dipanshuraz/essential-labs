/** Product details static copy. */

export const PRODUCT_GALLERY_IMAGES = [
  { main: "shop/shop-details-1.png", thumb: "shop/thumb-1.png" },
  { main: "shop/shop-details-2.png", thumb: "shop/thumb-2.png" },
  { main: "shop/shop-details-3.png", thumb: "shop/thumb-3.png" },
  { main: "shop/shop-details-4.png", thumb: "shop/thumb-4.png" },
] as const;

export const PRODUCT_DESCRIPTION_PARAS = [
  "Our product is designed for everyday play and comfort. Durable materials and kid-safe finishes match the Kiddex demo catalog.",
  "Choose the size and colour that fits your child. This listing uses the same layout stack as the original HTML theme for visual parity.",
] as const;

export const PRODUCT_FEATURES = [
  "Soft, breathable fabrics suitable for active kids",
  "Easy-care materials for busy parents",
  "Tested for quality and everyday wear",
  "Available in multiple sizes and colours",
  "Fast dispatch from the Kiddex demo store",
  "30-day return policy on eligible items",
] as const;

export const PRODUCT_SPECS = [
  { label: "Model Name", value: "Kiddex Demo Product" },
  { label: "Brand", value: "Kiddex" },
  { label: "Condition", value: "Brand New" },
  { label: "Material", value: "Cotton blend" },
  { label: "Made in", value: "Bangladesh" },
  { label: "Warranty", value: "01 Year" },
  { label: "Colour", value: "Multi" },
] as const;

export const PRODUCT_REVIEWS = [
  {
    id: "r1",
    author: "Eleanor Pena",
    date: "March 20, 2024",
    avatar: "resource/review-1.png",
    likes: 12,
    dislikes: 3,
    body: "Great quality and my kids love it. Shipping was quick and the packaging was secure.",
    images: [
      "resource/review-img-1.jpg",
      "resource/review-img-2.jpg",
      "resource/review-img-3.jpg",
      "resource/review-img-4.jpg",
    ],
    reply: {
      author: "Seller",
      avatar: "resource/review-2.png",
      body: "Thank you for your review — we're glad your family enjoyed the product!",
    },
  },
  {
    id: "r2",
    author: "Wade Warren",
    date: "June 12, 2023",
    avatar: "resource/review-3.png",
    likes: 12,
    dislikes: 0,
    body: "Solid purchase for the price. Would recommend to other parents looking for reliable kidswear.",
    images: [] as string[],
  },
] as const;
