import { Case, NewCase, Status } from "./types";
import { seedCases } from "./mock";

// REST client. With NEXT_PUBLIC_API_URL unset it falls back to in-memory mock data.
// Expected endpoints: GET /cases, POST /cases
const BASE = process.env.NEXT_PUBLIC_API_URL;
let memory: Case[] | null = null;
const db = () => (memory ??= seedCases());

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json() as Promise<T>;
}

export async function fetchCases(): Promise<Case[]> {
  if (BASE) return http<Case[]>("/cases");
  await new Promise((r) => setTimeout(r, 250));
  return [...db()];
}

export async function createCase(input: NewCase): Promise<Case> {
  if (BASE) return http<Case>("/cases", { method: "POST", body: JSON.stringify(input) });
  const created: Case = { ...input, status: "Pending", x: Math.random() * 100, y: Math.random() * 100 };
  db().push(created);
  return created;
}

export async function updateCaseStatus(id: string, status: Status): Promise<Case> {
  if (BASE) return http<Case>(`/cases/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
  const c = db().find((x) => x.id === id);
  if (!c) throw new Error("Case not found");
  c.status = status;
  return { ...c };
}

export function nextCaseId(cases: Case[]): string {
  const max = cases.reduce((m, c) => Math.max(m, Number(c.id.replace(/\D/g, "")) || 0), 1039);
  return `NCA-${max + 1}`;
}
