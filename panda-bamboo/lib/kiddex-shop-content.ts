/** Shop / search sidebar static copy. */

export const SHOP_AGE_FILTERS = [
  "0-3 month",
  "3-6 month",
  "6-9 month",
  "1 years",
  "2-3 years",
  "4-5 years",
  "6-9 years",
  "10+ Years",
  "Teenager",
] as const;

export const SHOP_STATUS_FILTERS = ["In Stock", "On Sale", "Upcoming", "Out of Stock"] as const;

export const SHOP_EXTRA_CATEGORIES = [
  "Sports",
  "Devices",
  "Indoor Games",
  "Outdoor Games",
  "Games & Puzzle",
  "Kids Toys",
  "Cartoon",
] as const;

export const SHOP_ACCORDION_GROUPS = [
  {
    id: "stickers",
    title: "Stickers",
    items: ["Marvel Studio", "Pokemon", "Cars", "Sports", "Cartoon", "Bikes"],
  },
  {
    id: "toys",
    title: "Kids Toys",
    items: ["Marvel Studio", "Pokemon", "Cars", "Sports", "Cartoon"],
  },
  {
    id: "books",
    title: "Books",
    items: ["Marvel Studio", "Pokemon", "Sports"],
  },
] as const;

export const SHOP_SIZE_FILTERS = ["XS", "S", "M", "L", "XL", "XXL"] as const;
