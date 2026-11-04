"use client";
import { useT } from "@/lib/i18n";
import CaseForm from "@/components/CaseForm";

export default function NewCasePage() {
  const t = useT();
  return (
    <>
      <h1 className="h1">{t("add")}</h1>
      <CaseForm />
    </>
  );
}
