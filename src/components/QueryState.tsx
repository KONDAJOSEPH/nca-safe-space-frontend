"use client";
import { useT } from "@/lib/i18n";

export function Loading() {
  const t = useT();
  return <div className="card text-muted" role="status">{t("loading")}</div>;
}
export function ErrorBox({ retry }: { retry: () => void }) {
  const t = useT();
  return (
    <div className="card" role="alert">
      <p className="text-bad">{t("loadErr")}</p>
      <button className="btn mt-3" onClick={retry}>{t("retry")}</button>
    </div>
  );
}
