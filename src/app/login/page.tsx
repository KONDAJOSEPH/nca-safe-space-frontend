"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { DEMO_ACCOUNTS } from "@/lib/mock";
import { Role } from "@/lib/types";

const ROLES: Role[] = ["Admin", "Staff", "Viewer"];

export default function LoginPage() {
  const t = useT();
  const router = useRouter();
  const { lang, setLang, setUser } = useStore();
  const [role, setRole] = useState<Role>("Staff");
  const [email, setEmail] = useState<string>(DEMO_ACCOUNTS.Staff[0]);
  const [pw, setPw] = useState<string>(DEMO_ACCOUNTS.Staff[1]);
  const [error, setError] = useState(false);

  const pick = (r: Role) => { setRole(r); setEmail(DEMO_ACCOUNTS[r][0]); setPw(DEMO_ACCOUNTS[r][1]); setError(false); };
  // DEMO ONLY: replace with a real call to your auth endpoint (httpOnly cookie session).
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const [de, dp] = DEMO_ACCOUNTS[role];
    if (email.trim() !== de || pw !== dp) return setError(true);
    setUser({ email: de, role });
    router.replace("/dashboard");
  };

  return (
    <div className="grid min-h-screen place-items-center p-5">
      <form onSubmit={submit} className="card w-full max-w-sm !p-7">
        <button type="button" className="btn-ghost mb-3 !px-3 !py-1 text-sm" onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "العربية" : "English"}</button>
        <h1 className="text-2xl font-bold">{t("app")}</h1>
        <p className="text-sm text-muted">{t("online")}</p>
        <label className="label" htmlFor="email">{t("email")}</label>
        <input id="email" type="email" autoComplete="username" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="label" htmlFor="pw">{t("pass")}</label>
        <input id="pw" type="password" autoComplete="current-password" className="input" value={pw} onChange={(e) => setPw(e.target.value)} />
        <span className="label">{t("role")}</span>
        <div className="flex gap-1.5">
          {ROLES.map((r) => (
            <button key={r} type="button" onClick={() => pick(r)} className={`flex-1 rounded-lg border p-2 ${role === r ? "border-brand bg-soft font-semibold" : "border-line"}`}>{t(r)}</button>
          ))}
        </div>
        {error && <div className="err" role="alert">{t("badLogin")}</div>}
        <div className="mt-4 rounded-lg border border-dashed border-line bg-soft p-3 text-sm">
          <div>{t("demo")}</div>
          <table dir="ltr" className="mt-1.5 font-mono text-xs">
            <tbody>
              {ROLES.map((r) => (
                <tr key={r} className="cursor-pointer" onClick={() => pick(r)}>
                  <td className="pe-2 font-sans font-semibold">{t(r)}</td><td className="pe-2">{DEMO_ACCOUNTS[r][0]}</td><td>{DEMO_ACCOUNTS[r][1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn mt-4 w-full">{t("login")}</button>
      </form>
    </div>
  );
}
