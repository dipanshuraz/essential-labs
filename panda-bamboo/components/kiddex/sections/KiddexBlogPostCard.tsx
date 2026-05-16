import Link from "next/link";
import type { BlogPost } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexBlogPostCard({ post, colClass = "col-lg-4 col-md-6 col-sm-12" }: { post: BlogPost; colClass?: string }) {
  const TitleTag = post.headingLevel ?? "h3";
  return (
    <div className={`${colClass} news-block`}>
      <div className="news-block-one">
        <div className="inner-box">
          <div className="image-box">
            <figure className="image"><Link href="/blog-details"><img src={asset(post.image)} alt="" /></Link></figure>
            {post.headingLevel === "h3" ? (
              <figure className="overlay-image"><Link href="/blog-details"><img src={asset(post.image)} alt="" /></Link></figure>
            ) : null}
            <ul className="post-info">
              <li>{post.date}</li>
              <li><Link href="/blog-details">By {post.author}</Link></li>
            </ul>
          </div>
          <div className="lower-content">
            <TitleTag><Link href="/blog-details">{post.title}</Link></TitleTag>
          </div>
        </div>
      </div>
    </div>
  );
}
