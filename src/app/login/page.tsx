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
    <main className="min-h-screen overflow-hidden bg-[#071723] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,169,110,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(94,129,172,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10 md:px-12">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
            <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] font-[family-name:var(--font-serif)] md:text-7xl">
              Commercial intelligence for the cannabinoid clinical landscape.
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              Track active trials, leading institutions, sponsor activity, patents, grants, and the studies most likely to matter commercially.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
              <span className="border border-white/10 bg-white/5 px-3 py-2">Live trial intelligence</span>
              <span className="border border-white/10 bg-white/5 px-3 py-2">Commercial scoring</span>
              <span className="border border-white/10 bg-white/5 px-3 py-2">Sponsor mapping</span>
              <span className="border border-white/10 bg-white/5 px-3 py-2">Institutional insights</span>
            </div>
          </div>

          <div className="w-full max-w-md border border-white/10 bg-white/6 p-8 backdrop-blur-sm lg:justify-self-end">
            <div className="text-xs uppercase tracking-[0.3em] text-[#c8a96e]">Secure Access</div>
            <h2 className="mt-4 text-4xl font-[family-name:var(--font-serif)]">Enter Platform</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              This deployment is currently protected while the product is being refined.
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
                className="w-full border border-white/15 bg-white/6 px-4 py-4 text-white placeholder:text-white/40 outline-none"
              />
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <button disabled={submitting} className="w-full bg-[#c8a96e] px-4 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#081723] disabled:opacity-60">
                {submitting ? "Entering..." : "Enter Platform"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
