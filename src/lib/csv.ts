import { Case } from "./types";

const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export function downloadCasesCsv(cases: Case[]) {
  const head = ["id", "title", "region", "date", "status", "notes"];
  const body = cases.map((c) => [c.id, c.title, c.region, c.date, c.status, c.notes].map(cell).join(","));
  const blob = new Blob(["\uFEFF" + [head.join(","), ...body].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "nca-cases.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}
