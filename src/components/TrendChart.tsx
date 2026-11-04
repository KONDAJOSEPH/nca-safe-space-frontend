"use client";
import { Case } from "@/lib/types";
import { useT } from "@/lib/i18n";

export default function TrendChart({ cases }: { cases: Case[] }) {
  const t = useT();
  const months = Array<number>(12).fill(0);
  cases.forEach((c) => months[Number(c.date.slice(5, 7)) - 1]++);
  const max = Math.max(...months, 1), w = 340, h = 160;
  const pts = months.map((v, i) => [28 + (i * (w - 44)) / 11, h - 26 - (v / max) * (h - 48)]);
  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">{t("trend")} · {t("monthly")}</h3>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={t("trend")}>
        <polyline fill="none" stroke="var(--brand)" strokeWidth="2.5" points={pts.map((p) => p.join(",")).join(" ")} />
        {pts.map(([x, y], i) => (
          <g key={i}><circle cx={x} cy={y} r="3.5" fill="var(--brand)" /><text x={x} y={h - 8} textAnchor="middle" fontSize="10" fill="var(--muted)">{i + 1}</text></g>
        ))}
        <text x="2" y="14" fontSize="10" fill="var(--muted)">{max}</text>
      </svg>
    </div>
  );
}
