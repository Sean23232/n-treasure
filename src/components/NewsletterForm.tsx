"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const isLight = tone === "light";

  if (status === "done") {
    return (
      <p className={`flex items-center gap-2 text-sm font-medium ${isLight ? "text-cream" : "text-charcoal"}`}>
        <Check size={16} className="text-terracotta-light" /> You&rsquo;re on the list!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none transition-colors ${
          isLight
            ? "border-cream/30 bg-transparent text-cream placeholder:text-cream/50 focus:border-cream"
            : "border-sand-dark bg-white text-charcoal placeholder:text-taupe focus:border-terracotta"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Join newsletter"
        className={`flex shrink-0 items-center justify-center rounded-full p-2.5 transition-all ${
          isLight ? "bg-cream text-charcoal hover:bg-terracotta-light" : "bg-charcoal text-cream hover:bg-terracotta"
        }`}
      >
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
