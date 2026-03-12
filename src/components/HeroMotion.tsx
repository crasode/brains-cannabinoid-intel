"use client";

import { useEffect, useState } from "react";

export function HeroMotion() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 240));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-[8%] top-[14%] h-56 w-56 rounded-full bg-[#c8a96e]/18 blur-3xl transition-transform duration-150"
        style={{ transform: `translateY(${offset * 0.12}px)` }}
      />
      <div
        className="absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-[#8eb1d6]/12 blur-3xl transition-transform duration-150"
        style={{ transform: `translateY(${offset * -0.08}px)` }}
      />
      <div
        className="absolute bottom-[-4rem] left-1/3 h-64 w-64 rounded-full bg-white/8 blur-3xl transition-transform duration-150"
        style={{ transform: `translateY(${offset * 0.1}px)` }}
      />
    </div>
  );
}
