import Link from "next/link";

const IMG = "/kiddex/assets/images";

/** Mobile slide-out + category panel — structure matches Kiddex `script.js` hooks. */
export function KiddexMobileMenus() {
  return (
    <>
      <div className="mobile-menu">
        <div className="menu-backdrop" />
        <div className="close-btn">
          <i className="fas fa-times" />
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <Link href="/">
              <img src={`${IMG}/logo.png`} alt="Panda Bamboo" />
            </Link>
          </div>
          <div className="menu-outer">{/* Menu HTML cloned from header via script.js */}</div>
          <div className="contact-info">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <a href="mailto:hello@pandabamboo.com">hello@pandabamboo.com</a>
              </li>
            </ul>
          </div>
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <Link href="/">
                  <span className="fab fa-twitter" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="fab fa-facebook-square" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="fab fa-instagram" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="category-menu">
        <div className="menu-backdrop" />
        <div className="outer-box">
          <div className="side-content">
            <div className="close-btn">
              <i className="far fa-times" />
            </div>
            <ul className="option-list">
              <li>
                <Link href="/wishlist">
                  <i className="far fa-heart" />
                </Link>
              </li>
              <li className="shop-cart cart-toggler">
                <button type="button">
                  <i className="far fa-shopping-bag" />
                </button>
              </li>
              <li>
                <Link href="/login">
                  <i className="far fa-user" />
                </Link>
              </li>
            </ul>
            <ul className="social-links">
              <li>
                <Link href="/">
                  <i className="icon-14" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <i className="icon-15" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="category-box">
            <div className="search-form">
              <form action="/shop" method="get" role="search">
                <div className="form-group">
                  <input type="search" name="q" placeholder="Search Product" required />
                  <button type="submit">
                    <i className="icon-4" />
                  </button>
                </div>
              </form>
            </div>
            <ul className="category-list product-category clearfix">
              <li className="category-dropdown">
                <Link href="/shop">All collections</Link>
                <div className="image">
                  <img src={`${IMG}/icons/category-1.png`} alt="" />
                </div>
                <ul>
                  <li>
                    <Link href="/shop">Shop all</Link>
                  </li>
                  <li>
                    <Link href="/wishlist">Wishlist</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
