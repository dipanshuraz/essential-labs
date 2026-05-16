"use client";

export default function StoreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        margin: "4rem auto",
        maxWidth: 560,
        padding: "2rem",
        fontFamily: "Nunito, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Something went wrong</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>{error.message}</p>
      <button
        type="button"
        onClick={reset}
        style={{
          background: "#f76188",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "0.75rem 1.5rem",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Try again
      </button>
    </div>
  );
}
