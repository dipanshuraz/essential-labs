"use client";

import { BannerSection } from "@/components/kiddex/sections/home/BannerSection";
import { BannerStyleFiveSection } from "@/components/kiddex/sections/home/BannerStyleFiveSection";
import { BannerStyleFourSection } from "@/components/kiddex/sections/home/BannerStyleFourSection";
import { BannerStyleThreeSection } from "@/components/kiddex/sections/home/BannerStyleThreeSection";
import { BannerStyleTwoSection } from "@/components/kiddex/sections/home/BannerStyleTwoSection";
import { BrandsLogoSection } from "@/components/kiddex/sections/home/BrandsLogoSection";
import { CategorySection } from "@/components/kiddex/sections/home/CategorySection";
import { CategoryStyleTwoSection } from "@/components/kiddex/sections/home/CategoryStyleTwoSection";
import { CollectionSection } from "@/components/kiddex/sections/home/CollectionSection";
import { DealsSection } from "@/components/kiddex/sections/home/DealsSection";
import { DealsStyleTwoSection } from "@/components/kiddex/sections/home/DealsStyleTwoSection";
import { FeaturedSection } from "@/components/kiddex/sections/home/FeaturedSection";
import { FeaturedStyleThreeSection } from "@/components/kiddex/sections/home/FeaturedStyleThreeSection";
import { FeaturedStyleTwoSection } from "@/components/kiddex/sections/home/FeaturedStyleTwoSection";
import { HomeProductCarouselSection } from "@/components/kiddex/sections/home/HomeProductCarouselSection";
import { HomeShopPreviewSection } from "@/components/kiddex/sections/home/HomeShopPreviewSection";
import { HomeShopWithAdsSection } from "@/components/kiddex/sections/home/HomeShopWithAdsSection";
import { HomeTestimonialSection } from "@/components/kiddex/sections/home/HomeTestimonialSection";
import { PopularProductsSection } from "@/components/kiddex/sections/home/PopularProductsSection";
import { KiddexCtaBandSection } from "@/components/kiddex/sections/shared/KiddexCtaBandSection";
import { KiddexHighlightsStrip } from "@/components/kiddex/sections/KiddexHighlightsStrip";
import { KiddexNewsSection } from "@/components/kiddex/sections/KiddexNewsSection";
import { KiddexSlideText } from "@/components/kiddex/sections/KiddexSlideText";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { formatPrice, products } from "@/lib/catalog";
import { SHOP_ADS_BLOCKS } from "@/lib/kiddex-home-content";
import { ABOUT_NEWS } from "@/lib/kiddex-site-content";

type Props = { variant?: number };

export function KiddexHomePage({ variant = 1 }: Props) {
  const priceLabel = products[0] ? formatPrice(products[0].price) : "$42.99";
  const popular = products.slice(0, 8);
  const carousel = products.slice(0, 4);
  const preview = products.slice(0, 4);
  const adsA = SHOP_ADS_BLOCKS[0];
  const adsB = SHOP_ADS_BLOCKS[1];

  if (variant === 1) {
    return (
      <>
        <BannerSection
          title="The Best Kids Toy Store in the City"
          priceLabel={priceLabel}
          decorated
        />
        <CategorySection />
        <FeaturedSection />
        <PopularProductsSection products={popular} />
        <DealsSection />
        <HomeShopPreviewSection products={preview} />
        <FeaturedStyleTwoSection />
        <CollectionSection products={products} />
        <HomeTestimonialSection />
        <KiddexNewsSection posts={ABOUT_NEWS} />
      </>
    );
  }

  if (variant === 2) {
    return (
      <>
        <BannerStyleTwoSection />
        <KiddexHighlightsStrip className="highlights-section pt_30" />
        <CategoryStyleTwoSection />
        <HomeShopWithAdsSection products={carousel} {...adsA} />
        <BrandsLogoSection />
        <HomeProductCarouselSection
          products={carousel}
          sectionClass="shop-section pt_120 pb_90"
          title={
            <>
              New <span>Arrivals</span>
            </>
          }
        />
        <HomeProductCarouselSection
          products={popular}
          sectionClass="shop-section shop-style-three pt_120 pb_110"
          pattern="shape/shape-49.png"
          title={
            <>
              Trending <span>Products</span>
            </>
          }
        />
        <FeaturedStyleThreeSection />
        <DealsStyleTwoSection />
        <HomeShopWithAdsSection products={carousel} {...adsB} />
        <KiddexCtaBandSection />
        <KiddexNewsSection posts={ABOUT_NEWS} />
      </>
    );
  }

  if (variant === 3) {
    return (
      <>
        <BannerStyleThreeSection />
        <KiddexSlideText variant="three" />
        <CategorySection />
        <DealsSection />
        <KiddexHighlightsStrip className="highlights-style-two pb_100" />
        <HomeProductCarouselSection
          products={popular}
          sectionClass="shop-section shop-style-five pt_120 pb_90"
          title={
            <>
              Best <span>Sellers</span>
            </>
          }
        />
        <BrandsLogoSection sectionClass="brands-style-two centred pb_90" />
        <FeaturedSection />
        <HomeShopPreviewSection products={preview} />
        <KiddexCtaBandSection title="Grab the Best Deals Today" />
        <HomeTestimonialSection />
        <KiddexNewsSection posts={ABOUT_NEWS} />
      </>
    );
  }

  if (variant === 4) {
    return (
      <>
        <BannerStyleFourSection />
        <KiddexHighlightsStrip className="highlights-style-two pb_100" />
        <HomeProductCarouselSection
          products={carousel}
          sectionClass="shop-section shop-style-three pt_120 pb_90"
          title={
            <>
              Top <span>Picks</span>
            </>
          }
        />
        <FeaturedStyleTwoSection />
        <CategorySection />
        <CollectionSection products={products} />
        <KiddexCtaBandSection />
        <BrandsLogoSection />
        <PopularProductsSection products={popular} />
        <HomeTestimonialSection />
        <KiddexNewsSection posts={ABOUT_NEWS} />
      </>
    );
  }

  return (
    <>
      <BannerStyleFiveSection />
      <HomeProductCarouselSection
        products={popular}
        sectionClass="shop-style-nine pt_110 pb_90"
        title={
          <>
            Top <span>Selling Books</span>
          </>
        }
        centred
      />
      <FeaturedSection />
      <CategoryStyleTwoSection />
      <HomeShopPreviewSection products={preview} />
      <KiddexHighlightsStrip className="highlights-section pt_30" />
      <PopularProductsSection
        products={popular}
        title={
          <>
            Featured <span>Books</span>
          </>
        }
      />
      <DealsSection />
      <KiddexNewsSection posts={ABOUT_NEWS} />
      <KiddexSubscribeSection />
    </>
  );
}
