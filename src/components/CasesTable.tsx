"use client";
import Link from "next/link";
import { useState } from "react";
import { Case } from "@/lib/types";
import { useT, Key } from "@/lib/i18n";
import StatusBadge from "./StatusBadge";

const PAGE_SIZE = 8;
type SortKey = "id" | "title" | "region" | "date" | "status";
const cols: [SortKey, Key][] = [["id", "id"], ["title", "title"], ["region", "region"], ["date", "date"], ["status", "st"]];

export default function CasesTable({ cases }: { cases: Case[] }) {
  const t = useT();
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "date", dir: -1 });
  const [page, setPage] = useState(1);

  const sorted = [...cases].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * sort.dir);
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = sorted.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const toggle = (key: SortKey) => setSort((s) => (s.key === key ? { key, dir: (-s.dir) as 1 | -1 } : { key, dir: 1 }));

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr>
              {cols.map(([key, label]) => (
                <th key={key} scope="col" className="cursor-pointer border-b border-line p-2.5 text-start text-sm text-muted" onClick={() => toggle(key)}>
                  {t(label)}{sort.key === key ? (sort.dir > 0 ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td className="border-b border-line p-2.5"><Link href={`/cases/${c.id}`} className="font-semibold text-brand underline-offset-2 hover:underline">{c.id}</Link></td>
                <td className="border-b border-line p-2.5">{c.title}</td>
                <td className="border-b border-line p-2.5">{t(c.region)}</td>
                <td className="border-b border-line p-2.5">{c.date}</td>
                <td className="border-b border-line p-2.5"><StatusBadge status={c.status} /></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-4 text-muted">{t("empty")}</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button className="btn-ghost" disabled={current < 2} onClick={() => setPage(current - 1)}>{t("prev")}</button>
        <span className="text-sm text-muted">{current} / {pages}</span>
        <button className="btn-ghost" disabled={current >= pages} onClick={() => setPage(current + 1)}>{t("next")}</button>
      </div>
    </>
  );
}
