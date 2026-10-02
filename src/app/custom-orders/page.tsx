import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircleHeart, PenLine, Sparkle } from "lucide-react";
import CustomOrderForm from "@/components/CustomOrderForm";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Start a Custom Order",
  description:
    "Have something specific in mind? Tell us about it. Submit a custom order request for candles, leather, engraving, acrylic, or a one-of-a-kind creation.",
};

const STEPS = [
  { icon: PenLine, title: "Tell us your idea", text: "Fill out the short guided form with your vision, timeline, and budget." },
  { icon: MessageCircleHeart, title: "We follow up personally", text: "We'll reply by email, usually within 1-2 business days, to talk through the details." },
  { icon: Sparkle, title: "We bring it to life", text: "Once we're aligned, we get to work — and keep you updated the whole way." },
];

export default function CustomOrdersPage() {
  return (
    <div className="pb-24 pt-32 sm:pt-36">
      <div className="relative mb-20 overflow-hidden">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <p className="section-eyebrow">Start a Custom Order</p>
            <h1 className="mt-4 text-balance font-serif text-[clamp(2.1rem,4.6vw,3.4rem)] italic leading-tight text-charcoal">
              Have something specific in mind? Tell us about it.
            </h1>
            <p className="mt-5 max-w-lg text-charcoal-soft">
              We&rsquo;ll take a look and get back to you. Whether it&rsquo;s a
              gift, an event, or something you&rsquo;ve been picturing for
              years, our custom process starts with a simple conversation.
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="left" className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/category-custom.jpg"
              alt="A crafting desk with sketches and material samples for a custom order"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </RevealOnScroll>
        </div>
      </div>

      <div className="container-site mb-20 grid gap-8 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <RevealOnScroll key={step.title} delay={i * 0.1}>
            <div className="rounded-2xl border border-sand-dark bg-white/60 p-7">
              <step.icon size={22} className="text-terracotta" />
              <h2 className="mt-4 font-serif text-lg italic text-charcoal">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{step.text}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="container-site max-w-3xl">
        <RevealOnScroll>
          <CustomOrderForm />
        </RevealOnScroll>
      </div>
    </div>
  );
}
