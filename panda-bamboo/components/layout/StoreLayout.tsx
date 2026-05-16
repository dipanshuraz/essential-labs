import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SubscribeBand } from "./SubscribeBand";

export function StoreLayout({
  children,
  showSubscribe = true,
}: {
  children: React.ReactNode;
  showSubscribe?: boolean;
}) {
  return (
  <>
      <SiteHeader />
      <main>{children}</main>
      {showSubscribe ? <SubscribeBand /> : null}
      <SiteFooter />
    </>
  );
}
