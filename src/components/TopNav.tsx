import Link from "next/link";

export function TopNav() {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-5 text-sm text-[#526174]">
      <Link href="/" className="underline underline-offset-4">Dashboard</Link>
      <Link href="/explorer" className="underline underline-offset-4">Explorer</Link>
      <Link href="/watchlist" className="underline underline-offset-4">Watchlist</Link>
    </nav>
  );
}
