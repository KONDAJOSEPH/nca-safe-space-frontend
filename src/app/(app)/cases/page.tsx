"use client";
import Link from "next/link";
import { useState } from "react";
import { useCases } from "@/lib/useCases";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { REGIONS, STATUSES } from "@/lib/types";
import CasesTable from "@/components/CasesTable";
import { ErrorBox, Loading } from "@/components/QueryState";

export default function CasesPage() {
  const t = useT();
  const role = useStore((s) => s.user?.role);
  const { data, isLoading, isError, refetch } = useCases();
  const [f, setF] = useState({ q: "", status: "", region: "", from: "", to: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const q = f.q.toLowerCase();
  const rows = (data ?? []).filter((c) =>
    (!f.status || c.status === f.status) && (!f.region || c.region === f.region) &&
    (!f.from || c.date >= f.from) && (!f.to || c.date <= f.to) &&
    (!q || `${c.id} ${c.title}`.toLowerCase().includes(q)));

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("cases")}</h1>
        {role !== "Viewer" && <Link href="/cases/new" className="btn hidden md:block">{t("add")}</Link>}
      </div>
      {isLoading && <Loading />}
      {isError && <ErrorBox retry={refetch} />}
      {data && (
        <div className="card">
          <div className="mb-3 grid grid-cols-2 gap-2.5 md:grid-cols-5">
            <input className="input col-span-2 md:col-span-1" placeholder={t("search")} aria-label={t("search")} value={f.q} onChange={set("q")} />
            <select className="input" value={f.status} onChange={set("status")} aria-label={t("st")}>
              <option value="">{t("allStatus")}</option>{STATUSES.map((s) => <option key={s} value={s}>{t(s)}</option>)}
            </select>
            <select className="input" value={f.region} onChange={set("region")} aria-label={t("region")}>
              <option value="">{t("allRegions")}</option>{REGIONS.map((r) => <option key={r} value={r}>{t(r)}</option>)}
            </select>
            <input type="date" className="input" aria-label={t("from")} value={f.from} onChange={set("from")} />
            <input type="date" className="input" aria-label={t("to")} value={f.to} onChange={set("to")} />
          </div>
          <CasesTable cases={rows} />
        </div>
      )}
    </>
  );
}
