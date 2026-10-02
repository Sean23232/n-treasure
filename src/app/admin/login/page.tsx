"use client";

export const dynamic = 'force-dynamic'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error();
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-5 pt-16">
      <div className="w-full max-w-sm rounded-[2rem] border border-sand-dark bg-white p-9 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-7 text-center font-serif text-2xl italic text-charcoal">Studio Dashboard</h1>
        <p className="mt-2 text-center text-sm text-charcoal-soft">Sign in to manage products and orders.</p>

        <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe" />
            <input
              type="password"
              required
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field pl-10"
            />
          </div>
          {error && <p className="text-sm font-medium text-terracotta-dark">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
