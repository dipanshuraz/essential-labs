import Link from "next/link";
import { Breadcrumb, Button, Input, Section, Text } from "@/design-system";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: isLogin ? "Login" : "Sign up" }]} />
      <Section containerClassName="max-w-md">
        <h1 className="text-3xl font-extrabold text-ink">{isLogin ? "Login" : "Create account"}</h1>
        <form className="mt-8 space-y-4">
          {!isLogin ? <Input placeholder="Full name" required /> : null}
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" className="w-full">
            {isLogin ? "Sign in" : "Register"}
          </Button>
        </form>
        <Text muted className="mt-6 text-center text-sm">
          {isLogin ? (
            <>
              No account? <Link href="/signup" className="font-semibold text-theme">Sign up</Link>
            </>
          ) : (
            <>
              Already have an account? <Link href="/login" className="font-semibold text-theme">Login</Link>
            </>
          )}
        </Text>
      </Section>
    </>
  );
}
