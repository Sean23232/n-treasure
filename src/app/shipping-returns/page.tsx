import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping & Returns" };

export default function ShippingReturnsPage() {
  return (
    <div className="container-site max-w-2xl pb-24 pt-32 sm:pt-36">
      <p className="section-eyebrow">Help</p>
      <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,2.8rem)] italic leading-tight text-charcoal">
        Shipping &amp; Returns
      </h1>

      <div className="mt-10 flex flex-col gap-8 text-charcoal-soft">
        <section>
          <h2 className="font-serif text-xl italic text-charcoal">Shipping</h2>
          <p className="mt-2 leading-relaxed">
            Most orders ship within 3–5 business days since every piece is
            made or finished to order in small batches. Custom orders may
            take longer — we&rsquo;ll always give you an estimated timeline
            before you confirm. Orders over $75 ship free within the
            continental US; smaller orders include a flat $7.50 shipping fee.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl italic text-charcoal">Returns &amp; Exchanges</h2>
          <p className="mt-2 leading-relaxed">
            Because many of our pieces are handmade or personalized, we
            evaluate returns on a case-by-case basis. If something arrives
            damaged or isn&rsquo;t what you expected, reach out within 14 days
            and we&rsquo;ll make it right — that&rsquo;s a promise, not a
            policy.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl italic text-charcoal">Custom Orders</h2>
          <p className="mt-2 leading-relaxed">
            Custom and personalized pieces are made specifically for you and
            are generally final sale once production begins. We&rsquo;ll
            always confirm details with you first.
          </p>
        </section>
      </div>
    </div>
  );
}
