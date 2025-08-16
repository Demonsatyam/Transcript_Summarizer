// src/lib/api.ts
const API = process.env.NEXT_PUBLIC_API_BASE!; // emulator or deployed Functions URL

export async function postJSON<T = any>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Request failed");
  return res.json();
}
