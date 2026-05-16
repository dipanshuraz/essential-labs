import { Card } from "@/components/ui/Card";
import { Link } from "react-router-dom";

export function PlaceholderPage({ title, hint }: { title: string; hint?: string }) {
  return (
    <Card className="max-w-lg">
      <h2 className="font-semibold text-ink">{title}</h2>
      <p className="text-sm text-ink-muted mt-2">
        {hint ?? "This section is a shell for future features. Navigation and layout are wired."}
      </p>
      <Link to="/" className="inline-block mt-4 text-sm font-semibold text-brand hover:underline">
        ← Back to Dashboard
      </Link>
    </Card>
  );
}
