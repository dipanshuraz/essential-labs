"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-neutral-900">This page couldn&apos;t load</h1>
      <p className="max-w-md text-sm text-neutral-600">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "A server error occurred. If this persists, check the database connection (e.g. Turso on Vercel) and AUTH_SECRET."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-neutral-900 px-5 py-2 text-sm text-white"
      >
        Reload
      </button>
    </div>
  );
}
