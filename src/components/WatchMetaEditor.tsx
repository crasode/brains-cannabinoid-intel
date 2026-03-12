"use client";

import { useEffect, useState } from "react";

export function WatchMetaEditor({ id }: { id: string }) {
  const [priority, setPriority] = useState("normal");
  const [status, setStatus] = useState("monitor");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/watchlist-meta').then((r) => r.json()).then((json) => {
      if (json.meta?.[id]) {
        setPriority(json.meta[id].priority || 'normal');
        setStatus(json.meta[id].status || 'monitor');
      }
    }).catch(() => {});
  }, [id]);

  async function save() {
    await fetch('/api/watchlist-meta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, priority, status }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  return (
    <div className="border border-black/5 bg-white p-5">
      <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Watchlist metadata</div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border border-black/10 px-3 py-3 text-sm">
          <option value="low">Low priority</option>
          <option value="normal">Normal priority</option>
          <option value="high">High priority</option>
          <option value="urgent">Urgent</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-black/10 px-3 py-3 text-sm">
          <option value="monitor">Monitor</option>
          <option value="review">Review</option>
          <option value="call">Call</option>
          <option value="partner">Partner</option>
        </select>
      </div>
      <button onClick={save} className="mt-3 bg-[#0d2035] px-4 py-2 text-sm font-medium text-white">{saved ? 'Saved' : 'Save watch metadata'}</button>
    </div>
  );
}
