import { getWatchMeta, setWatchMeta } from "@/lib/watchlist-meta";

export async function GET() {
  const meta = await getWatchMeta();
  return Response.json({ meta });
}

export async function POST(request: Request) {
  const { id, priority, status } = await request.json();
  const meta = await getWatchMeta();
  meta[id] = { priority, status };
  await setWatchMeta(meta);
  return Response.json({ meta });
}
