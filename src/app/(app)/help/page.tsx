"use client";
import { useState } from "react";
import { useT, Key } from "@/lib/i18n";
import { SUPPORT_EMAIL } from "@/lib/config";

const faqs: [Key, Key][] = [["q1", "a1"], ["q2", "a2"], ["q3", "a3"], ["q4", "a4"]];

export default function HelpPage() {
  const t = useT();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return setErr(true);
    setErr(false);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <h1 className="h1">{t("help")}</h1>
      <div className="grid max-w-4xl gap-3 lg:grid-cols-2">
        <section className="card">
          <h2 className="mb-2 font-semibold">{t("faq")}</h2>
          {faqs.map(([q, a]) => (
            <details key={q} className="border-b border-line py-2.5">
              <summary className="cursor-pointer font-medium">{t(q)}</summary>
              <p className="mt-2 text-sm text-muted">{t(a)}</p>
            </details>
          ))}
        </section>
        <form className="card" onSubmit={send}>
          <h2 className="font-semibold">{t("contact")}</h2>
          <label className="label" htmlFor="subject">{t("subject")}</label>
          <input id="subject" className="input" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <label className="label" htmlFor="message">{t("message")}</label>
          <textarea id="message" rows={5} className="input" value={message} onChange={(e) => setMessage(e.target.value)} />
          {err && <div className="err" role="alert">{t("req")}</div>}
          <button className="btn mt-4">{t("send")}</button>
        </form>
      </div>
    </>
  );
}
