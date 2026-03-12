import { cookies } from "next/headers";

const META_COOKIE = "brains_watch_meta";

type WatchMeta = Record<string, { priority?: string; status?: string }>;

export async function getWatchMeta(): Promise<WatchMeta> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(META_COOKIE)?.value;
  if (!raw) return {};
  try {
    return JSON.parse(raw) as WatchMeta;
  } catch {
    return {};
  }
}

export async function setWatchMeta(meta: WatchMeta) {
  const cookieStore = await cookies();
  cookieStore.set(META_COOKIE, JSON.stringify(meta), {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
