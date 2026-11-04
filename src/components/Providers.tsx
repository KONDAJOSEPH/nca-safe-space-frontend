"use client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStore } from "@/lib/store";
import SwRegister from "./SwRegister";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } }));
  const lang = useStore((s) => s.lang);
  const theme = useStore((s) => s.theme);

  // Arabic switches the whole document to RTL; Tailwind logical utilities (ms-*, ps-*, text-start) follow.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <QueryClientProvider client={client}>
      {children}
      <SwRegister />
    </QueryClientProvider>
  );
}
