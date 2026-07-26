"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Copper Spoon page error", error.digest || error.message);
  }, [error]);

  return (
    <main className="recovery-page">
      <div>
        <span aria-hidden="true">🍲</span>
        <p className="eyebrow">Something needs another stir</p>
        <h1>This page did not finish cooking.</h1>
        <p>Your account and saved information are safe. Try loading the page again or return home.</p>
        <div className="recovery-actions">
          <button className="button" type="button" onClick={reset}>Try again</button>
          <a className="text-link" href="/">Return home</a>
        </div>
      </div>
    </main>
  );
}
