"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { useCases } from "@/lib/useCases";

export default function Header() {
  const t = useT();
  const router = useRouter();
  const { user, lang, setLang, setUser } = useStore();
  const { data } = useCases();
  const pending = data?.filter((c) => c.status === "Pending").length ?? 0;

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-surface px-4 py-3 md:px-6" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
      <span className="rounded-full border border-line bg-soft px-2.5 py-0.5 text-xs">{user && t(user.role)}</span>
      <strong className="hidden truncate text-sm sm:block">{user?.email}</strong>
      <span className="flex-1" />
      <button className="btn-ghost" onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "العربية" : "English"}</button>
      <button aria-label="Notifications" className="relative text-lg">
        🔔{pending > 0 && <b className="absolute -top-1 end-[-6px] rounded-full bg-bad px-1.5 text-[10px] text-white">{pending}</b>}
      </button>
      <button className="btn-ghost hidden sm:block" onClick={() => { setUser(null); router.replace("/login"); }}>{t("logout")}</button>
    </header>
  );
}
