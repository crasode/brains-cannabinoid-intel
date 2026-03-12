"use client";

import { useState } from "react";

export function WatchToggle({ id }: { id: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const res = await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();
    setSaved((json.ids || []).includes(id));
    setLoading(false);
  }

  return (
    <button onClick={toggle} disabled={loading} className="text-sm font-medium text-[#0d2035] underline underline-offset-4">
      {saved ? 'Remove from watchlist' : 'Add to watchlist'}
    </button>
  );
}
