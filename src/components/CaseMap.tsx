"use client";
import { useState } from "react";
import { Case, REGIONS, Region } from "@/lib/types";
import { useT } from "@/lib/i18n";

// Stylised region map. Swap for Leaflet/Mapbox when you have real coordinates.
const CENTER: Record<Region, [number, number]> = { North: [150, 50], Central: [170, 125], East: [290, 110], West: [60, 120] };
const fill = { Active: "var(--active)", Resolved: "var(--ok)", Pending: "var(--warn)" };

export default function CaseMap({ cases }: { cases: Case[] }) {
  const t = useT();
  const [region, setRegion] = useState<Region | "">("");
  const pins = cases.filter((c) => !region || c.region === region);
  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">{t("map")}</h3>
      <select className="input mb-3 max-w-[14rem]" value={region} onChange={(e) => setRegion(e.target.value as Region | "")} aria-label={t("region")}>
        <option value="">{t("allRegions")}</option>
        {REGIONS.map((r) => <option key={r} value={r}>{t(r)}</option>)}
      </select>
      <svg viewBox="0 0 360 200" width="100%" role="img" aria-label={t("map")}>
        <rect width="360" height="200" rx="10" fill="var(--soft)" />
        {REGIONS.map((r) => {
          const [x, y] = CENTER[r], on = region === r;
          return (
            <g key={r}>
              <rect x={x - 50} y={y - 40} width="100" height="80" rx="10" fill="none" stroke={on ? "var(--brand)" : "var(--line)"} strokeWidth={on ? 2.5 : 1} strokeDasharray="4 3" />
              <text x={x - 44} y={y - 28} fontSize="10" fill="var(--muted)">{t(r)}</text>
            </g>
          );
        })}
        {pins.map((c) => {
          const [x, y] = CENTER[c.region];
          return (
            <circle key={c.id} cx={x - 40 + c.x * 0.8} cy={y - 14 + c.y * 0.45} r="5" fill={fill[c.status]} stroke="var(--surface)" strokeWidth="1.5">
              <title>{`${c.id} · ${c.title}`}</title>
            </circle>
          );
        })}
      </svg>
    </div>
  );
}
