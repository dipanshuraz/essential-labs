import { KiddexLayout } from "@/components/kiddex/layout/KiddexLayout";
import { KiddexHomePage } from "@/components/kiddex/pages/KiddexHomePage";

export default function HomePage() {
  return (
    <KiddexLayout>
      <KiddexHomePage variant={2} />
    </KiddexLayout>
  );
}
