import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.APP_PASSWORD || "BSPG";

  if (password !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("brains_auth", "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return Response.json({ ok: true });
}
