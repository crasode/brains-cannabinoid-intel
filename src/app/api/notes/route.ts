import { getNotesMap, setNotesMap } from "@/lib/notes";

export async function GET() {
  const notes = await getNotesMap();
  return Response.json({ notes });
}

export async function POST(request: Request) {
  const { id, note } = await request.json();
  const notes = await getNotesMap();
  notes[id] = note;
  await setNotesMap(notes);
  return Response.json({ notes });
}
