import Link from "next/link";
import { KiddexPageTitle } from "@/components/kiddex/layout/KiddexPageTitle";

type Props = {
  title: string;
  description?: string;
};

export function KiddexStaticPage({ title, description }: Props) {
  const label = title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ");

  return (
    <>
      <KiddexPageTitle crumbs={[{ label: "Home", href: "/" }, { label: label }]} />
      <section className="about-section pt_60 pb_120">
        <div className="large-container">
          <div className="sec-title centred pb_30">
            <h2>{label}</h2>
          </div>
          <p className="centred" style={{ maxWidth: 640, margin: "0 auto 24px" }}>
            {description ??
              `Kiddex template page "${label}" rendered as a React component with original theme styles.`}
          </p>
          <p className="centred">
            <Link href="/shop" className="theme-btn btn-one">
              Browse kidswear
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
