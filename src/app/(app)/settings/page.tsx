"use client";
import { useEffect, useState } from "react";
import { useStore, Theme } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Lang } from "@/lib/types";

export default function SettingsPage() {
  const t = useT();
  const { lang, setLang, theme, setTheme } = useStore();
  const [perm, setPerm] = useState<NotificationPermission | "unsupported">("default");
  const [note, setNote] = useState("");

  useEffect(() => { setPerm("Notification" in window ? Notification.permission : "unsupported"); }, []);

  const enable = async () => {
    if (!("Notification" in window)) return;
    setPerm(await Notification.requestPermission());
  };
  const clearCache = async () => {
    if ("caches" in window) await Promise.all((await caches.keys()).map((k) => caches.delete(k)));
    setNote(t("cleared"));
  };
  const themes: [Theme, "system" | "light" | "dark"][] = [["system", "system"], ["light", "light"], ["dark", "dark"]];

  return (
    <>
      <h1 className="h1">{t("settings")}</h1>
      <div className="card max-w-xl">
        <span className="label !mt-0">{t("language")}</span>
        <div className="seg">
          {([["en", "English"], ["ar", "العربية"]] as [Lang, string][]).map(([l, name]) => (
            <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{name}</button>
          ))}
        </div>

        <span className="label">{t("theme")}</span>
        <div className="seg">
          {themes.map(([v, key]) => <button key={v} aria-pressed={theme === v} onClick={() => setTheme(v)}>{t(key)}</button>)}
        </div>

        <span className="label">{t("notifications")}</span>
        {perm === "granted" && <p className="text-sm text-ok">{t("notifGranted")}</p>}
        {perm === "denied" && <p className="text-sm text-bad">{t("notifDenied")}</p>}
        {perm === "unsupported" && <p className="text-sm text-muted">{t("notifUnsupported")}</p>}
        {perm === "default" && <button className="btn-ghost" onClick={enable}>{t("notifOn")}</button>}

        <div className="mt-6 border-t border-line pt-4">
          <button className="btn-ghost" onClick={clearCache}>{t("clearCache")}</button>
          {note && <p className="mt-2 text-sm text-ok" role="status">{note}</p>}
        </div>
      </div>
    </>
  );
}
