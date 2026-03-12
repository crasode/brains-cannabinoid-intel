import { cookies } from "next/headers";

const COOKIE_NAME = "brains_watchlist";

export async function getWatchlistIds() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return [] as string[];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [] as string[];
  }
}

export async function setWatchlistIds(ids: string[]) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(Array.from(new Set(ids))), {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}
