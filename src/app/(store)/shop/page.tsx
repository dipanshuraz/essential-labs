import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/format";
import { KiddexPageTitle } from "@/components/kiddex/kiddex-page-title";
import { ShopBlockOne } from "@/components/kiddex/kiddex-shop-block-one";
import { ShopSidebar } from "@/components/kiddex/shop-sidebar";
import { Prisma } from "@/generated/prisma/client";

export const revalidate = 60;

type Props = { searchParams: Promise<{ category?: string; q?: string }> };

export default async function ShopPage({ searchParams }: Props) {
  const { category: catSlug, q: rawQ } = await searchParams;
  const q = rawQ?.trim() ?? "";

  const category = catSlug
    ? await prisma.category.findUnique({ where: { slug: catSlug } })
    : null;

  const where: Prisma.ProductWhereInput = {};
  if (category) where.categoryId = category.id;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const total = products.length;
  const rangeLabel = total === 0 ? "0" : `1–${total}`;

  return (
    <>
      <KiddexPageTitle
        items={[
          { href: "/", label: "Home" },
          { label: "Shop" },
        ]}
      />
      <section className="shop-page-section pt_60 pb_120">
        <div className="large-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-12 col-sm-12 sidebar-side">
              <ShopSidebar
                categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
                activeCategorySlug={category?.slug ?? null}
                searchQuery={q}
              />
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="our-shop">
                <div className="item-shorting">
                  <div className="left-column">
                    <div className="text">
                      <p>
                        Showing <span>{rangeLabel}</span> of <span>{total}</span> results
                      </p>
                    </div>
                  </div>
                  <div className="right-column">
                    <div className="short-box mr_30">
                      <p>Sort:</p>
                      <div className="select-box">
                        <select className="wide" aria-label="Sort products" defaultValue="new">
                          <option value="new">Newest</option>
                          <option value="name">Name</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wrapper grid">
                  <div className="shop-grid-content">
                    <div className="inner-container clearfix">
                      {products.length === 0 ? (
                        <p className="centred p-5">No products match your filters.</p>
                      ) : (
                        products.map((p) => (
                          <ShopBlockOne
                            key={p.id}
                            product={{
                              id: p.id,
                              name: p.name,
                              slug: p.slug,
                              priceCents: p.priceCents,
                              image: parseImages(p.images)[0] ?? null,
                              categoryName: p.category.name,
                              stock: p.stock,
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
