import Link from "next/link";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";
import { KiddexBlogSidebar } from "@/components/kiddex/sections/KiddexBlogSidebar";
import { KiddexSubscribeSection } from "@/components/kiddex/sections/KiddexSubscribeSection";
import { asset } from "@/lib/assets";

export function KiddexBlogDetailsPage() {
  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: "Blog Details" }]} />
      <section className="sidebar-page-container blog-standard pb_120">
        <div className="large-container">
          <div className="sec-title centred mb_50">
            <h2>Blog <span>Details</span></h2>
          </div>
          <div className="row clearfix">
            <div className="col-xl-9 col-lg-12 col-md-12 content-side">
              <div className="blog-details-content mr_30">
                <div className="news-block-one pb_30">
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image"><img src={asset("news/news-19.png")} alt="" /></figure>
                      <ul className="post-info">
                        <li>June 11, 2024</li>
                        <li><Link href="/blog-details">By Admin</Link></li>
                      </ul>
                    </div>
                    <div className="lower-content">
                      <h2>The Charity Shield - More than just a trial</h2>
                      <p className="mb_25">
                        Enables users to interact with and explore virtual worlds as if they were physically present.
                        A computer-generated simulation of a real or imaginary environment used for training, gaming,
                        education, or research purposes.
                      </p>
                      <p>
                        Virtual meetings enable participants to communicate and collaborate from different locations.
                        Software-based agents provide assistance using natural language processing and AI algorithms.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-one">
                  <blockquote className="mb_35">
                    <div className="icon-box"><i className="icon-37" /></div>
                    <p>
                      Virtual encompasses technologies that leverage digital simulations to mimic real-world
                      interactions, environments, or phenomena.
                    </p>
                    <h4>Brooklyn Simmons</h4>
                  </blockquote>
                </div>
                <div className="post-share-option pb_50 mb_30">
                  <ul className="tags-list">
                    <li><span>Tags:</span></li>
                    <li><Link href="/blog-details">Puzzles</Link></li>
                    <li><Link href="/blog-details">Indoor Toys</Link></li>
                    <li><Link href="/blog-details">Toys</Link></li>
                  </ul>
                </div>
                <div className="comment-box">
                  <h3>Write Comment</h3>
                  <div className="form-inner">
                    <form method="post" action="#">
                      <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                          <div className="form-group">
                            <label>Name <span>*</span></label>
                            <input type="text" name="name" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                          <div className="form-group">
                            <label>Email <span>*</span></label>
                            <input type="email" name="email" />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 single-column">
                          <div className="form-group">
                            <label>Message <span>*</span></label>
                            <textarea name="message" />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 single-column">
                          <div className="message-btn">
                            <button type="submit" className="theme-btn btn-one">Send Message</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <KiddexBlogSidebar />
          </div>
        </div>
      </section>
      <KiddexSubscribeSection />
    </>
  );
}
