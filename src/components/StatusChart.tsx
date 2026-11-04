"use client";
import { Case, STATUSES } from "@/lib/types";
import { useT } from "@/lib/i18n";

const fill = { Active: "var(--active)", Resolved: "var(--ok)", Pending: "var(--warn)" };

export default function StatusChart({ cases }: { cases: Case[] }) {
  const t = useT();
  const total = cases.length || 1;
  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">{t("status")}</h3>
      <svg viewBox="0 0 340 160" width="100%" role="img" aria-label={t("status")} dir="ltr">
        {STATUSES.map((s, i) => {
          const v = cases.filter((c) => c.status === s).length, bw = (v / total) * 210;
          return (
            <g key={s}>
              <text x="4" y={38 + i * 42} fontSize="12" fill="var(--muted)">{t(s)}</text>
              <rect x="84" y={22 + i * 42} width={bw} height="24" rx="4" fill={fill[s]} />
              <text x={92 + bw} y={39 + i * 42} fontSize="12" fill="var(--muted)">{v}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
