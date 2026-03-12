"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Incorrect password.");
        setSubmitting(false);
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Login failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#081723] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c8a96e]">Brains Intelligence Platform</p>
        <h1 className="mt-4 text-4xl font-[family-name:var(--font-serif)]">Cannabinoid Trial Intelligence</h1>
        <p className="mt-4 text-sm leading-7 text-white/70">
          Protected internal access. Enter the current password to view the dashboard.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-white/15 bg-[#0d2035] px-4 py-3 outline-none"
          />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button disabled={submitting} className="w-full bg-[#c8a96e] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#081723] disabled:opacity-60">
            {submitting ? "Entering..." : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
