"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          category: "General Inquiry",
          projectTitle: form.subject || "Website Contact Form",
          description: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-ivory p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/20 text-sage-dark">
          <Check size={22} />
        </div>
        <p className="mt-4 font-serif text-xl italic text-charcoal">Message received.</p>
        <p className="mt-2 text-sm text-charcoal-soft">We&rsquo;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <input required placeholder="Your name" className="field" value={form.name} onChange={(e) => update("name", e.target.value)} />
        <input required type="email" placeholder="Email" className="field" value={form.email} onChange={(e) => update("email", e.target.value)} />
      </div>
      <input placeholder="Subject" className="field" value={form.subject} onChange={(e) => update("subject", e.target.value)} />
      <textarea required rows={5} placeholder="How can we help?" className="field" value={form.message} onChange={(e) => update("message", e.target.value)} />
      {status === "error" && <p className="text-sm text-terracotta-dark">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit">
        {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Send Message"}
      </button>
    </form>
  );
}
