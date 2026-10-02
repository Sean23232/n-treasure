import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const FAQS = [
  {
    q: "Is everything really handmade?",
    a: "Yes — every piece is made, assembled, or finished by hand in our home studio. We keep batches small on purpose.",
  },
  {
    q: "Can I request a custom version of an existing product?",
    a: "Often, yes! Visit our Custom Orders page and tell us what you have in mind — colors, text, sizing, or materials.",
  },
  {
    q: "How long do custom orders take?",
    a: "It depends on the project, but most custom pieces take 1–3 weeks from when we confirm the details together.",
  },
  {
    q: "Do you still sell at craft shows?",
    a: "We do! Follow us on social media for upcoming show dates — we'd love to say hello in person.",
  },
  {
    q: "What if an item is sold out?",
    a: "Many of our pieces are made in limited batches. Reach out via our contact page and we'll let you know when it's back.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-site max-w-2xl pb-24 pt-32 sm:pt-36">
      <p className="section-eyebrow">Help</p>
      <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,2.8rem)] italic leading-tight text-charcoal">
        Frequently Asked Questions
      </h1>
      <div className="mt-10 flex flex-col divide-y divide-sand">
        {FAQS.map((item) => (
          <div key={item.q} className="py-6">
            <h2 className="font-serif text-lg italic text-charcoal">{item.q}</h2>
            <p className="mt-2 leading-relaxed text-charcoal-soft">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
