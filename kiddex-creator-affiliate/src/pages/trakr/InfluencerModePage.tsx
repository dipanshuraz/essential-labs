import { Link } from "react-router-dom";

export function InfluencerModePage() {
  return (
    <div className="mx-auto max-w-lg space-y-4 pt-12 text-center">
      <h1 className="text-2xl font-bold text-ink dark:text-zinc-100">Influencer mode</h1>
      <p className="text-sm text-ink-muted">
        This preview route stands in for the partner-facing experience. Use the program manager sidebar to return to operations.
      </p>
      <Link to="/" className="btn-primary inline-flex">
        Back to dashboard
      </Link>
    </div>
  );
}
