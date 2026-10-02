import RevealOnScroll from "@/components/RevealOnScroll";
import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="bg-sand/60 py-20 sm:py-24">
      <div className="container-site flex flex-col items-center text-center">
        <RevealOnScroll>
          <p className="section-eyebrow">Stay close</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.6vw,2.5rem)] italic leading-tight text-charcoal">
            Come see what we&rsquo;re making next.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="mt-4 max-w-md text-charcoal-soft">
            New creations, custom pieces, and occasional little treasures
            delivered to your inbox. No spam, just good stuff.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.3} className="mt-7">
          <NewsletterForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
