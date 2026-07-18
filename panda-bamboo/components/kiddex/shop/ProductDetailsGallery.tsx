import Link from "next/link";
import { asset } from "@/lib/assets";
import { PRODUCT_GALLERY_IMAGES } from "@/lib/kiddex-product-details-content";

type Props = { layout: "slider" | "stacked"; fallbackImage: string };

export function ProductDetailsGallery({ layout, fallbackImage }: Props) {
  const slides = PRODUCT_GALLERY_IMAGES.length > 0 ? PRODUCT_GALLERY_IMAGES : [{ main: fallbackImage, thumb: fallbackImage }];

  if (layout === "stacked") {
    return (
      <div className="image-content">
        {slides.map((slide, index) => (
          <div
            key={slide.main}
            className={`image-box${index < slides.length - 1 ? " mb_30" : ""}`}
          >
            <figure className="image">
              <Link href={asset(slide.main)} className="lightbox-image" data-fancybox="gallery">
                <img src={asset(slide.main)} alt="" />
              </Link>
            </figure>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bxslider">
      {slides.map((slide) => (
        <div key={slide.main} className="slider-content">
          <div className="image-inner">
            <div className="image-box">
              <figure className="image">
                <Link href={asset(slide.main)} className="lightbox-image" data-fancybox="gallery">
                  <img src={asset(slide.main)} alt="" />
                </Link>
              </figure>
            </div>
            <div className="slider-pager">
              <ul className="thumb-box">
                {slides.map((thumb, i) => (
                  <li key={thumb.thumb}>
                    <a className={i === 0 ? "active" : undefined} data-slide-index={String(i)} href="#">
                      <figure>
                        <img src={asset(thumb.thumb)} alt="" />
                      </figure>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
