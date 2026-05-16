import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/kiddex-site-content";
import { asset } from "@/lib/assets";

export function KiddexBlogSidebar() {
  return (
    <div className="col-xl-3 col-lg-12 col-md-12 sidebar-side">
      <div className="blog-sidebar">
        <div className="sidebar-widget search-widget mb_55">
          <div className="search-form">
            <form action="/blog" method="get">
              <div className="form-group">
                <input type="search" name="q" placeholder="Search Products" required />
                <button type="submit"><i className="icon-4" /></button>
              </div>
            </form>
          </div>
        </div>
        <div className="sidebar-widget category-widget mb_50">
          <div className="widget-title mb_14"><h3>Categories</h3></div>
          <div className="widget-content">
            <ul className="category-list clearfix">
              {BLOG_CATEGORIES.map((name, i) => (
                <li key={name}>
                  <div className="check-box-two">
                    <input className="check" type="checkbox" id={`blog-cat-${i}`} />
                    <label htmlFor={`blog-cat-${i}`}>{name}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebar-widget post-widget mb_50">
          <div className="widget-title mb_25"><h3>Recent Posts</h3></div>
          <div className="post-inner">
            <div className="post">
              <figure className="image-box"><Link href="/blog-details"><img src={asset("news/news-19.png")} alt="" /></Link></figure>
              <div className="inner">
                <span className="post-date">June 11, 2024</span>
                <h5><Link href="/blog-details">The Charity Shield - More than just a trial</Link></h5>
              </div>
            </div>
            <div className="post">
              <figure className="image-box"><Link href="/blog-details"><img src={asset("news/news-20.png")} alt="" /></Link></figure>
              <div className="inner">
                <span className="post-date">June 10, 2024</span>
                <h5><Link href="/blog-details">Why choose a theme that looks good with WooCommerce</Link></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
