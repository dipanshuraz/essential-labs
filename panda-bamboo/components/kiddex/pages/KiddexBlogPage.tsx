import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexBlogCta } from "@/components/kiddex/sections/KiddexBlogCta";
import { KiddexBlogPostCard } from "@/components/kiddex/sections/KiddexBlogPostCard";
import { KiddexBlogSidebar } from "@/components/kiddex/sections/KiddexBlogSidebar";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { BLOG_GRID_POSTS, BLOG_STANDARD_POSTS } from "@/lib/kiddex-site-content";

type Props = { layout?: "grid" | "standard" };

export function KiddexBlogPage({ layout = "grid" }: Props) {
  const isGrid = layout === "grid";
  const posts = isGrid ? BLOG_GRID_POSTS : BLOG_STANDARD_POSTS;
  const crumb = isGrid ? "Blog Grid" : "Blog Standard";
  const title = isGrid ? "Grid" : "Standard";

  const firstRow = isGrid ? posts.slice(0, 6) : posts.slice(0, 3);
  const afterCta = isGrid ? posts.slice(6, 9) : posts.slice(3);
  const lastRow = isGrid ? posts.slice(9) : [];

  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: crumb }]} />
      <section className={`sidebar-page-container ${isGrid ? "blog-grid" : "blog-standard"} pb_120`}>
        <div className="large-container">
          <div className="sec-title centred mb_50">
            <h2>Blog <span>{title}</span></h2>
          </div>
          <div className="row clearfix">
            <div className="col-xl-9 col-lg-12 col-md-12 content-side">
              {isGrid ? (
                <div className="blog-grid-content">
                  <div className="row clearfix">
                    {firstRow.map((post) => (
                      <KiddexBlogPostCard key={post.title} post={post} />
                    ))}
                  </div>
                  <KiddexBlogCta />
                  <div className="row clearfix">
                    {afterCta.map((post) => (
                      <KiddexBlogPostCard key={post.title} post={post} />
                    ))}
                  </div>
                  {lastRow.length > 0 ? (
                    <div className="row clearfix">
                      {lastRow.map((post) => (
                        <KiddexBlogPostCard key={post.title} post={post} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="blog-standard-content">
                  {firstRow.map((post) => (
                    <KiddexBlogPostCard key={post.title} post={{ ...post, headingLevel: "h2" }} colClass="col-lg-12 col-md-12 col-sm-12" />
                  ))}
                  <KiddexBlogCta />
                  {afterCta.map((post) => (
                    <KiddexBlogPostCard key={post.title} post={{ ...post, headingLevel: "h2" }} colClass="col-lg-12 col-md-12 col-sm-12" />
                  ))}
                </div>
              )}
            </div>
            <KiddexBlogSidebar />
          </div>
        </div>
      </section>
      <KiddexSubscribeSection />
    </>
  );
}
