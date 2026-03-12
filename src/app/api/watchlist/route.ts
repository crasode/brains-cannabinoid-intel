import { getWatchlistIds, setWatchlistIds } from "@/lib/watchlist";

export async function GET() {
  const ids = await getWatchlistIds();
  return Response.json({ ids });
}

export async function POST(request: Request) {
  const { id } = await request.json();
  const ids = await getWatchlistIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  await setWatchlistIds(next);
  return Response.json({ ids: next });
}
