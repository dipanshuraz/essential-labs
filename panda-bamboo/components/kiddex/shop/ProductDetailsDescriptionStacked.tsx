import { asset } from "@/lib/assets";
import {
  PRODUCT_DESCRIPTION_PARAS,
  PRODUCT_FEATURES,
  PRODUCT_REVIEWS,
  PRODUCT_SPECS,
} from "@/lib/kiddex-product-details-content";

export function ProductDetailsDescriptionStacked() {
  return (
    <div className="product-discription">
      <div className="discription-content">
        <h2>Descriptions</h2>
        {PRODUCT_DESCRIPTION_PARAS.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <h4>Features :</h4>
        <ul className="list-style-one clearfix">
          {PRODUCT_FEATURES.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <div className="specification-content">
        <h2>Specifications</h2>
        <ul className="specification-list clearfix">
          {PRODUCT_SPECS.map((row) => (
            <li key={row.label}>
              <strong>{row.label}</strong>
              {row.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="review-content">
        <h2>Reviews</h2>
        {PRODUCT_REVIEWS.map((review) => (
          <div key={review.id} className="single-review">
            <div className="upper-box">
              <div className="info-box">
                <figure className="image">
                  <img src={asset(review.avatar)} alt="" />
                </figure>
                <div className="inner">
                  <h4>{review.author}</h4>
                  <span className="date">{review.date}</span>
                </div>
              </div>
              <ul className="option-btn">
                <li>
                  <button type="button">
                    <i className="icon-33" />
                  </button>
                  {review.likes}
                </li>
                <li>
                  <button type="button">
                    <i className="icon-34" />
                  </button>
                  {review.dislikes}
                </li>
              </ul>
            </div>
            <ul className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <i className="icon-10" />
                </li>
              ))}
            </ul>
            <p>{review.body}</p>
            {review.images.length > 0 ? (
              <ul className="image-list">
                {review.images.map((src) => (
                  <li key={src}>
                    <img src={asset(src)} alt="" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
