"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT, Key } from "@/lib/i18n";

const items: [string, string, Key, boolean?][] = [
  ["/dashboard", "⌂", "home"], ["/cases", "☰", "cases"], ["/cases/new", "＋", "add", true], ["/profile", "☺", "profile"],
];

export default function BottomNav() {
  const t = useT();
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex gap-1.5 border-t border-line bg-surface px-2 pt-1.5 md:hidden" style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}>
      {items.map(([href, icon, key, primary]) => {
        const on = path === href;
        return (
          <Link key={href} href={href} className={`flex min-h-[48px] flex-1 flex-col items-center justify-center rounded-xl text-xs ${primary ? "bg-brand font-bold text-brand-ink" : on ? "font-bold text-brand" : "text-muted"}`}>
            <span className="text-base leading-none">{icon}</span>{t(key)}
          </Link>
        );
      })}
    </nav>
  );
}
