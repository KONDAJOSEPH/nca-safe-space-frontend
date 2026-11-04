"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { useCases } from "@/lib/useCases";

// Chrome/Edge/Android fire this when the app is installable.
interface InstallEvent extends Event { prompt: () => Promise<void> }

export default function ProfilePage() {
  const t = useT();
  const router = useRouter();
  const { user, setUser } = useStore();
  const { data } = useCases();
  const [installEvt, setInstallEvt] = useState<InstallEvent | null>(null);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const on = (e: Event) => { e.preventDefault(); setInstallEvt(e as InstallEvent); };
    window.addEventListener("beforeinstallprompt", on);
    return () => window.removeEventListener("beforeinstallprompt", on);
  }, []);

  const install = async () => (installEvt ? installEvt.prompt() : setHint(true));
  const initial = (user?.email[0] ?? "?").toUpperCase();

  return (
    <>
      <h1 className="h1">{t("profile")}</h1>
      <div className="card max-w-xl">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand text-xl font-bold text-brand-ink" aria-hidden>{initial}</div>
          <div className="min-w-0">
            <div className="truncate font-semibold">{user?.email}</div>
            <span className="rounded-full border border-line bg-soft px-2.5 py-0.5 text-xs">{user && t(user.role)}</span>
          </div>
        </div>
        <dl className="mt-4 border-t border-line pt-3 text-sm">
          <div className="flex justify-between py-1.5"><dt className="text-muted">{t("account")}</dt><dd>{user && t(user.role)}</dd></div>
          <div className="flex justify-between py-1.5"><dt className="text-muted">{t("totalInSystem")}</dt><dd>{data?.length ?? "…"}</dd></div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-ghost" onClick={install}>{t("install")}</button>
          <button className="btn" onClick={() => { setUser(null); router.replace("/login"); }}>{t("logout")}</button>
        </div>
        {hint && <p className="mt-3 text-sm text-muted" role="status">{t("installHint")}</p>}
      </div>
    </>
  );
}
