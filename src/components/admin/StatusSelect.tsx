"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StatusSelect({
  id,
  endpoint,
  value,
  options,
}: {
  id: number;
  endpoint: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(value);
  const [saving, setSaving] = useState(false);

  const onChange = async (newValue: string) => {
    setCurrent(newValue);
    setSaving(true);
    await fetch(`${endpoint}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newValue }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border border-sand-dark bg-white px-3 py-1.5 text-xs font-medium text-charcoal outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
