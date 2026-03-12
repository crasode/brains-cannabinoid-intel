export async function GET() {
  return Response.json({ ok: true, service: "brains-cannabinoid-intel", updatedAt: new Date().toISOString() });
}
