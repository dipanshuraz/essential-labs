import Link from "next/link";
import { asset } from "@/lib/assets";

const BLOCKS = [
  {
    col: "col-lg-3",
    image: "resource/feature-4.png",
    imageClass: "p_absolute r_0 b_0",
    title: "Puzzle for Kids",
    price: "$50 Only",
    align: "",
  },
  {
    col: "col-lg-6",
    image: "resource/feature-5.png",
    imageClass: "p_absolute r_0 b_0",
    eyebrow: "Special Offer",
    title: "Buy One Get One",
    align: "",
  },
  {
    col: "col-lg-3",
    image: "resource/feature-6.png",
    imageClass: "p_absolute l_0 b_0",
    title: "Puzzle for Kids",
    price: "$40 Only",
    align: "align-3",
  },
] as const;

type Props = { className?: string };

export function FeaturedStyleTwoSection({ className = "featured-style-two" }: Props) {
  return (
    <section className={className}>
      <div className="large-container">
        <div className="inner-container">
          <div className="row clearfix">
            {BLOCKS.map((block) => (
              <div key={block.image} className={`${block.col} col-md-6 col-sm-12 featured-block`}>
                <div className="featured-block-two">
                  <div className="inner-box">
                    <figure className={`image-box ${block.imageClass}`}>
                      <img src={asset(block.image)} alt="" />
                    </figure>
                    <div className={`text-box ${block.align}`}>
                      {"eyebrow" in block ? <span className="text">{block.eyebrow}</span> : null}
                      <h2>{block.title}</h2>
                      {"price" in block ? (
                        <h4>
                          <span>From</span> {block.price}
                        </h4>
                      ) : null}
                      <Link href="/shop-details" className="theme-btn btn-one">
                        Shop now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
