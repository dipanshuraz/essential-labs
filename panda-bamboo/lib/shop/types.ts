export type CartLine = {
  productId: string;
  qty: number;
  size?: string;
};

export type ShopSnapshot = {
  cart: CartLine[];
  wishlist: string[];
};
