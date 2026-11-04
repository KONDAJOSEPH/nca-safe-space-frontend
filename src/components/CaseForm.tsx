"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCase, nextCaseId } from "@/lib/api";
import { useCases } from "@/lib/useCases";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { REGIONS, Region } from "@/lib/types";

export default function CaseForm() {
  const t = useT();
  const router = useRouter();
  const qc = useQueryClient();
  const role = useStore((s) => s.user?.role);
  const { data: cases = [] } = useCases();
  const [f, setF] = useState({ title: "", region: "North" as Region, date: "2026-10-29", notes: "" });
  const [photo, setPhoto] = useState<string>();
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const caseId = nextCaseId(cases); // auto-generated case code

  const save = useMutation({
    mutationFn: createCase,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["cases"] }); router.push("/cases"); },
  });

  if (role === "Viewer") return <div className="card">{t("noAdd")}</div>;

  const onPhoto = (file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setPhoto(String(r.result));
    r.readAsDataURL(file);
  };
  const submit = () => {
    const e = { title: !f.title.trim(), date: !f.date, notes: !f.notes.trim() };
    setErrs(e);
    if (Object.values(e).some(Boolean)) return;
    save.mutate({ id: caseId, title: f.title.trim(), region: f.region, date: f.date, notes: f.notes.trim(), photo });
  };
  const field = (k: "title" | "notes" | "date") => errs[k] && <div className="err">{t("req")}</div>;

  return (
    <div className="card max-w-xl">
      <label className="label">{t("id")}</label>
      <input className="input" value={caseId} readOnly />
      <label className="label" htmlFor="title">{t("title")}</label>
      <input id="title" className="input" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />{field("title")}
      <label className="label" htmlFor="region">{t("region")}</label>
      <select id="region" className="input" value={f.region} onChange={(e) => setF({ ...f, region: e.target.value as Region })}>
        {REGIONS.map((r) => <option key={r} value={r}>{t(r)}</option>)}
      </select>
      <label className="label" htmlFor="date">{t("date")}</label>
      <input id="date" type="date" className="input" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />{field("date")}
      <label className="label" htmlFor="notes">{t("desc")}</label>
      <textarea id="notes" rows={4} className="input" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />{field("notes")}
      <label className="label" htmlFor="photo">{t("photo")}</label>
      <input id="photo" type="file" accept="image/*" capture="environment" className="input" onChange={(e) => onPhoto(e.target.files?.[0])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {photo && <img src={photo} alt="" className="mt-2 max-w-[140px] rounded-lg" />}
      {save.isError && <div className="err">{(save.error as Error).message}</div>}
      <button className="btn mt-4" onClick={submit} disabled={save.isPending}>{t("save")}</button>
    </div>
  );
}
