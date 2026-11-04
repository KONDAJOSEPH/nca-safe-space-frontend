"use client";
import { Case } from "@/lib/types";
import { useT } from "@/lib/i18n";

export default function StatCards({ cases }: { cases: Case[] }) {
  const t = useT();
  const n = (s: string) => cases.filter((c) => c.status === s).length;
  const cards = [["total", cases.length], ["active", n("Active")], ["resolved", n("Resolved")], ["pending", n("Pending")]] as const;
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(([k, v]) => (
        <div key={k} className="card"><div className="text-sm text-muted">{t(k)}</div><div className="text-3xl font-bold">{v}</div></div>
      ))}
    </div>
  );
}
