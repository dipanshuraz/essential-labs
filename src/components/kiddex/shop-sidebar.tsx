import Link from "next/link";

export type CategoryItem = { id: string; name: string; slug: string };

type Props = {
  categories: CategoryItem[];
  activeCategorySlug: string | null;
  searchQuery: string;
};

export function ShopSidebar({ categories, activeCategorySlug, searchQuery }: Props) {
  const base = "/shop";
  return (
    <div className="shop-sidebar">
      <div className="search-widget sidebar-widget">
        <form action={base} method="get" role="search">
          <div className="form-group">
            <input
              type="search"
              name="q"
              placeholder="Search Products"
              defaultValue={searchQuery}
              aria-label="Search products"
            />
            <button type="submit">
              <i className="icon-4" />
            </button>
          </div>
        </form>
      </div>
      <div className="filter-widget sidebar-widget">
        <div className="widget-title mb_30">
          <h4>Filter by Price</h4>
        </div>
        <div className="price-range-slider">
          <div id="slider-range" className="range-bar mb_30" />
          <div className="range-box">
            <p className="range-value">
              <span>Price:</span>
              <input type="text" id="amount" readOnly defaultValue="$120 - $200" />
            </p>
            <button type="button" className="theme-btn btn-one filter-btn">
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="category-widget sidebar-widget">
        <div className="widget-title mb_30">
          <h3>Product Categories</h3>
        </div>
        <div className="widget-content">
          <ul className="category-list clearfix">
            <li>
              {!activeCategorySlug ? <strong>All products</strong> : <Link href={base}>All products</Link>}
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                {activeCategorySlug === c.slug ? (
                  <strong>{c.name}</strong>
                ) : (
                  <Link href={`${base}?category=${encodeURIComponent(c.slug)}`}>{c.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
