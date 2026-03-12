import { cookies } from "next/headers";

const NOTES_COOKIE = "brains_notes";

type NotesMap = Record<string, string>;

export async function getNotesMap(): Promise<NotesMap> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(NOTES_COOKIE)?.value;
  if (!raw) return {};
  try {
    return JSON.parse(raw) as NotesMap;
  } catch {
    return {};
  }
}

export async function setNotesMap(notes: NotesMap) {
  const cookieStore = await cookies();
  cookieStore.set(NOTES_COOKIE, JSON.stringify(notes), {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
