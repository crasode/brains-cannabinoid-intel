"use client";

import { useEffect, useState } from "react";

export function NoteBox({ id }: { id: string }) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/notes').then((r) => r.json()).then((json) => {
      if (json.notes?.[id]) setNote(json.notes[id]);
    }).catch(() => {});
  }, [id]);

  async function save() {
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, note }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="border border-black/5 bg-white p-5">
      <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Internal note</div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add BD or diligence notes here..." className="mt-3 min-h-[120px] w-full border border-black/10 p-3 text-sm outline-none" />
      <button onClick={save} className="mt-3 bg-[#0d2035] px-4 py-2 text-sm font-medium text-white">{saved ? 'Saved' : 'Save note'}</button>
    </div>
  );
}
