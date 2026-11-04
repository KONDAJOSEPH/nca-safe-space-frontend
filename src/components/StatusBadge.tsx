"use client";
import { Status } from "@/lib/types";
import { useT } from "@/lib/i18n";

const color: Record<Status, string> = { Active: "text-active", Resolved: "text-ok", Pending: "text-warn" };

export default function StatusBadge({ status }: { status: Status }) {
  const t = useT();
  return <span className={`rounded-full border border-current px-2 py-0.5 text-xs font-semibold ${color[status]}`}>{t(status)}</span>;
}
