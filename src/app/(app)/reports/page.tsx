"use client";
import { useCases } from "@/lib/useCases";
import { useT } from "@/lib/i18n";
import { downloadCasesCsv } from "@/lib/csv";
import { REGIONS, STATUSES, Case } from "@/lib/types";
import { ErrorBox, Loading } from "@/components/QueryState";

function Bars({ rows, color }: { rows: [string, number][]; color: string }) {
  const max = Math.max(...rows.map((r) => r[1]), 1);
  return (
    <ul className="space-y-2.5">
      {rows.map(([label, n]) => (
        <li key={label} className="grid grid-cols-[6rem_1fr_2rem] items-center gap-2 text-sm">
          <span className="text-muted">{label}</span>
          <span className="h-5 rounded bg-soft"><span className="block h-5 rounded" style={{ width: `${(n / max) * 100}%`, background: color }} /></span>
          <span className="text-end">{n}</span>
        </li>
      ))}
    </ul>
  );
}

function Report({ cases }: { cases: Case[] }) {
  const t = useT();
  const months = Array<number>(12).fill(0);
  cases.forEach((c) => months[Number(c.date.slice(5, 7)) - 1]++);
  const resolved = cases.filter((c) => c.status === "Resolved").length;
  const rate = cases.length ? Math.round((resolved / cases.length) * 100) : 0;
  const busy = months.filter((m) => m > 0).length || 1;

  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="card"><div className="text-sm text-muted">{t("total")}</div><div className="text-3xl font-bold">{cases.length}</div></div>
        <div className="card"><div className="text-sm text-muted">{t("rate")}</div><div className="text-3xl font-bold">{rate}%</div></div>
        <div className="card"><div className="text-sm text-muted">{t("perMonth")}</div><div className="text-3xl font-bold">{(cases.length / busy).toFixed(1)}</div></div>
      </div>
      <div className="mb-3 grid gap-3 lg:grid-cols-2">
        <div className="card"><h3 className="mb-3 font-semibold">{t("byRegion")}</h3>
          <Bars color="var(--brand)" rows={REGIONS.map((r) => [t(r), cases.filter((c) => c.region === r).length])} /></div>
        <div className="card"><h3 className="mb-3 font-semibold">{t("status")}</h3>
          <Bars color="var(--active)" rows={STATUSES.map((s) => [t(s), cases.filter((c) => c.status === s).length])} /></div>
      </div>
      <div className="card overflow-x-auto">
        <h3 className="mb-2 font-semibold">{t("monthly")}</h3>
        <table className="w-full text-sm">
          <thead><tr><th className="border-b border-line p-2 text-start text-muted">{t("month")}</th><th className="border-b border-line p-2 text-start text-muted">{t("cases")}</th></tr></thead>
          <tbody>{months.map((n, i) => <tr key={i}><td className="border-b border-line p-2">{i + 1}</td><td className="border-b border-line p-2">{n}</td></tr>)}</tbody>
        </table>
      </div>
    </>
  );
}

export default function ReportsPage() {
  const t = useT();
  const { data, isLoading, isError, refetch } = useCases();
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("reports")}</h1>
        {data && <button className="btn" onClick={() => downloadCasesCsv(data)}>{t("exportCsv")}</button>}
      </div>
      {isLoading && <Loading />}
      {isError && <ErrorBox retry={refetch} />}
      {data && <Report cases={data} />}
    </>
  );
}
