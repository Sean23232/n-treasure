import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Necessary Treasures — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="container-site pb-24 pt-32 sm:pt-36">
      <RevealOnScroll className="max-w-xl">
        <p className="section-eyebrow">Contact</p>
        <h1 className="mt-4 font-serif text-[clamp(2.1rem,4.4vw,3.2rem)] italic leading-tight text-charcoal">
          We&rsquo;d love to hear from you
        </h1>
        <p className="mt-4 text-charcoal-soft">
          Questions about an order, a product, or just want to say hello?
          Reach out below — a real person will get back to you.
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <RevealOnScroll className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <Mail size={19} className="mt-0.5 text-terracotta" />
            <div>
              <p className="text-sm font-semibold text-charcoal">Email</p>
              <p className="text-sm text-charcoal-soft">info@necessarytreasures.com</p>
              <p className="text-sm text-charcoal-soft">custom@necessarytreasures.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={19} className="mt-0.5 text-terracotta" />
            <div>
              <p className="text-sm font-semibold text-charcoal">Phone</p>
              <p className="text-sm text-charcoal-soft">(717) 555-0192</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={19} className="mt-0.5 text-terracotta" />
            <div>
              <p className="text-sm font-semibold text-charcoal">Studio</p>
              <p className="text-sm text-charcoal-soft">Based in South Central Pennsylvania. Local pickup available by request.</p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="rounded-[2rem] border border-sand-dark bg-white/60 p-7 sm:p-9">
          <ContactForm />
        </RevealOnScroll>
      </div>
    </div>
  );
}
