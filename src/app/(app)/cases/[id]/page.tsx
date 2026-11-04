"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCases } from "@/lib/useCases";
import { updateCaseStatus } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { STATUSES } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";
import { ErrorBox, Loading } from "@/components/QueryState";

export default function CaseDetailPage() {
  const t = useT();
  const { id } = useParams<{ id: string }>();
  const role = useStore((s) => s.user?.role);
  const qc = useQueryClient();
  const { data, isLoading, isError, refetch } = useCases();
  const change = useMutation({
    mutationFn: (status: (typeof STATUSES)[number]) => updateCaseStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });

  const c = data?.find((x) => x.id === id);
  const row = (label: string, value: React.ReactNode) => (
    <div className="border-b border-line py-2.5 sm:grid sm:grid-cols-[10rem_1fr]"><dt className="text-sm text-muted">{label}</dt><dd>{value}</dd></div>
  );

  return (
    <>
      <Link href="/cases" className="mb-3 inline-block text-sm text-brand hover:underline">← {t("back")}</Link>
      <h1 className="h1">{t("details")} · {id}</h1>
      {isLoading && <Loading />}
      {isError && <ErrorBox retry={refetch} />}
      {data && !c && <div className="card">{t("notFound")}</div>}
      {c && (
        <div className="card max-w-2xl">
          <dl>
            {row(t("title"), c.title)}
            {row(t("region"), t(c.region))}
            {row(t("date"), c.date)}
            {row(t("st"), <StatusBadge status={c.status} />)}
            {row(t("desc"), c.notes || <span className="text-muted">{t("noNotes")}</span>)}
          </dl>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {c.photo && <img src={c.photo} alt="" className="mt-3 max-w-xs rounded-lg" />}
          {role !== "Viewer" && (
            <>
              <span className="label">{t("changeStatus")}</span>
              <div className="seg">
                {STATUSES.map((s) => (
                  <button key={s} aria-pressed={c.status === s} disabled={change.isPending} onClick={() => change.mutate(s)}>{t(s)}</button>
                ))}
              </div>
              {change.isError && <div className="err">{(change.error as Error).message}</div>}
            </>
          )}
        </div>
      )}
    </>
  );
}
