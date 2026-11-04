"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHydrated, useStore } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = useStore((s) => s.user);
  const hydrated = useHydrated();
  const router = useRouter();

  useEffect(() => { if (hydrated && !user) router.replace("/login"); }, [hydrated, user, router]);
  if (!hydrated || !user) return null;

  return (
    <div className="min-h-screen md:grid md:grid-cols-[14rem_1fr]">
      <Sidebar />
      <div className="min-w-0">
        <Header />
        <main className="max-w-6xl p-4 pb-28 md:p-6">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
