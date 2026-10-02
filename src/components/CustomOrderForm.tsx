"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, UploadCloud, X } from "lucide-react";

const CATEGORY_OPTIONS = [
  "Candles",
  "Leather",
  "Laser Engraving",
  "Acrylic",
  "Something that mixes materials",
  "Not sure yet",
];

export default function CustomOrderForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    projectTitle: "",
    description: "",
    quantity: "",
    deadline: "",
    budgetRange: "",
    additionalNotes: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)].slice(0, 5));
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const canContinueStep1 = form.name && form.email && form.category;
  const canContinueStep2 = form.description.trim().length > 4;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      let fileUrls: string[] = [];
      if (files.length) {
        setUploading(true);
        const uploaded = await Promise.all(
          files.map(async (file) => {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("folder", "custom-orders");
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            if (!res.ok) throw new Error("upload failed");
            const data = await res.json();
            return data.url as string;
          }),
        );
        fileUrls = uploaded;
        setUploading(false);
      }

      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fileUrls }),
      });
      if (!res.ok) throw new Error("submit failed");
      setDone(true);
    } catch {
      setError("Something went wrong sending your idea. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] bg-ivory px-8 py-16 text-center sm:px-16"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-sage-dark">
          <Check size={28} />
        </div>
        <h2 className="mt-6 font-serif text-3xl italic text-charcoal">We got your idea.</h2>
        <p className="mx-auto mt-4 max-w-md text-charcoal-soft">
          Thank you for sharing it with us. We&rsquo;ll take a look and be in
          touch soon, usually within 1-2 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-sand-dark bg-white/70 p-6 sm:p-10">
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step >= s ? "bg-terracotta text-cream" : "bg-sand text-charcoal-soft"
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className={`h-px w-8 sm:w-16 ${step > s ? "bg-terracotta" : "bg-sand-dark"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <h2 className="font-serif text-2xl italic text-charcoal">Let&rsquo;s start with you</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" required>
                <input className="field" value={form.name} onChange={(e) => update("name", e.target.value)} />
              </Field>
              <Field label="Email" required>
                <input type="email" className="field" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </Field>
              <Field label="Phone">
                <input className="field" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </Field>
              <Field label="Which category is this closest to?" required>
                <select className="field" value={form.category} onChange={(e) => update("category", e.target.value)}>
                  <option value="">Select one…</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                disabled={!canContinueStep1}
                onClick={() => setStep(2)}
                className="btn-primary disabled:cursor-not-allowed disabled:bg-taupe disabled:shadow-none"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <h2 className="font-serif text-2xl italic text-charcoal">Tell us about your idea</h2>
            <div className="mt-6 grid gap-5">
              <Field label="Project title (optional)">
                <input className="field" value={form.projectTitle} onChange={(e) => update("projectTitle", e.target.value)} placeholder="e.g. Wedding gift for my sister" />
              </Field>
              <Field label="What would you like created?" required>
                <textarea
                  rows={5}
                  className="field"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Tell us about the idea — materials, colors, text, inspiration, anything at all."
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Desired quantity">
                  <input className="field" value={form.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder="e.g. 1, 10, 50+" />
                </Field>
                <Field label="Preferred deadline">
                  <input className="field" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} placeholder="e.g. By June 10" />
                </Field>
                <Field label="Budget range">
                  <input className="field" value={form.budgetRange} onChange={(e) => update("budgetRange", e.target.value)} placeholder="e.g. $50-$100" />
                </Field>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary">Back</button>
              <button
                type="button"
                disabled={!canContinueStep2}
                onClick={() => setStep(3)}
                className="btn-primary disabled:cursor-not-allowed disabled:bg-taupe disabled:shadow-none"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <h2 className="font-serif text-2xl italic text-charcoal">Almost there</h2>
            <div className="mt-6 grid gap-5">
              <Field label="Upload inspiration images or artwork (optional)">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand-dark bg-cream px-6 py-10 text-center transition-colors hover:border-terracotta">
                  <UploadCloud size={24} className="text-taupe" />
                  <span className="text-sm text-charcoal-soft">Drag &amp; drop or click to upload (up to 5 files)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => onFilesSelected(e.target.files)}
                  />
                </label>
                {files.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {files.map((file, i) => (
                      <li key={i} className="flex items-center gap-2 rounded-full bg-sand px-3 py-1.5 text-xs text-charcoal">
                        {file.name}
                        <button type="button" onClick={() => removeFile(i)} aria-label={`Remove ${file.name}`}>
                          <X size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Field>
              <Field label="Additional notes">
                <textarea rows={3} className="field" value={form.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} />
              </Field>
            </div>

            {error && <p className="mt-4 text-sm font-medium text-terracotta-dark">{error}</p>}

            <div className="mt-8 flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="btn-secondary">Back</button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="btn-primary disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {uploading ? "Uploading…" : "Sending…"}
                  </>
                ) : (
                  "Send Us Your Idea"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label} {required && <span className="text-terracotta">*</span>}
      </span>
      {children}
    </label>
  );
}
