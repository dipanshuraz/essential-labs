import { CustomerAuthProvider } from "@/lib/customer-auth/CustomerAuthProvider";
import { AccountAuthGate } from "@/components/account/AccountAuthGate";
import { KiddexAccountSection } from "@/components/account/KiddexAccountSection";
import { KiddexLayout } from "@/components/kiddex/layout/KiddexLayout";

export default function AccountAreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomerAuthProvider>
      <AccountAuthGate>
        <KiddexLayout>
          <KiddexAccountSection>{children}</KiddexAccountSection>
        </KiddexLayout>
      </AccountAuthGate>
    </CustomerAuthProvider>
  );
}
