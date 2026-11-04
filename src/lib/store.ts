"use client";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Lang, User } from "./types";

export type Theme = "system" | "light" | "dark";

interface State {
  user: User | null;
  lang: Lang;
  theme: Theme;
  setUser: (u: User | null) => void;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      lang: "en",
      theme: "system",
      setUser: (user) => set({ user }),
      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "nca-safe-space" }
  )
);

/** True once the persisted store has been read from localStorage (avoids SSR mismatch). */
export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const done = () => setReady(true);
    if (useStore.persist.hasHydrated()) done();
    return useStore.persist.onFinishHydration(done);
  }, []);
  return ready;
}
