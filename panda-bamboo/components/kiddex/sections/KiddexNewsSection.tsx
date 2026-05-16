import Link from "next/link";
import type { NewsCard } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexNewsSection({ posts, className = "news-section pt_120 pb_90" }: { posts: NewsCard[]; className?: string }) {
  return (
    <section className={className}>
      <div className="shape-layer rotate-me" style={{ backgroundImage: `url(${asset("shape/shape-29.png")})` }} />
      <div className="large-container">
        <div className="sec-title centred mb_50">
          <h2>Latest From <span>Media</span></h2>
        </div>
        <div className="row clearfix">
          {posts.map((post) => (
            <div key={post.title} className="col-lg-3 col-md-6 col-sm-12 news-block">
              <div
                className="news-block-one wow fadeInUp animated"
                {...(post.wowDelay ? { "data-wow-delay": post.wowDelay } : {})}
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image"><Link href="/blog-details"><img src={asset(post.image)} alt="" /></Link></figure>
                    <figure className="overlay-image"><Link href="/blog-details"><img src={asset(post.image)} alt="" /></Link></figure>
                    <ul className="post-info">
                      <li>{post.date}</li>
                      <li><Link href="/blog-details">By {post.author}</Link></li>
                    </ul>
                  </div>
                  <div className="lower-content">
                    <h3><Link href="/blog-details">{post.title}</Link></h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
