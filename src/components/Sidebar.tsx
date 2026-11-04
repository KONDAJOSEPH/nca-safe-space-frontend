"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT, Key } from "@/lib/i18n";

const items: [string, Key][] = [
  ["/dashboard", "dashboard"], ["/cases", "cases"], ["/reports", "reports"], ["/settings", "settings"], ["/help", "help"], ["/profile", "profile"],
];

export default function Sidebar() {
  const t = useT();
  const path = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen bg-[#12263f] p-3 text-slate-200 md:block">
      <h2 className="mb-5 mt-1 px-3 text-lg font-bold">{t("app")}</h2>
      <nav className="space-y-0.5">
        {items.map(([href, key]) => {
          const on = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link key={href} href={href} className={`block rounded-lg px-3 py-2.5 ${on ? "bg-brand font-semibold text-brand-ink" : "text-slate-300 hover:bg-white/10"}`}>
              {t(key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
