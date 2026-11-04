"use client";
import { useCases } from "@/lib/useCases";
import { useT } from "@/lib/i18n";
import StatCards from "@/components/StatCards";
import TrendChart from "@/components/TrendChart";
import StatusChart from "@/components/StatusChart";
import CaseMap from "@/components/CaseMap";
import { ErrorBox, Loading } from "@/components/QueryState";

export default function DashboardPage() {
  const t = useT();
  const { data, isLoading, isError, refetch } = useCases();
  return (
    <>
      <h1 className="h1">{t("dashboard")}</h1>
      {isLoading && <Loading />}
      {isError && <ErrorBox retry={refetch} />}
      {data && (
        <>
          <StatCards cases={data} />
          <div className="mb-3 grid gap-3 lg:grid-cols-2"><TrendChart cases={data} /><StatusChart cases={data} /></div>
          <CaseMap cases={data} />
        </>
      )}
    </>
  );
}
