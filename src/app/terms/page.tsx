export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-site max-w-2xl pb-24 pt-32 sm:pt-36">
      <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] italic leading-tight text-charcoal">Terms of Service</h1>
      <div className="mt-8 flex flex-col gap-5 leading-relaxed text-charcoal-soft">
        <p>
          By placing an order with Necessary Treasures, you agree to provide
          accurate information and understand that handmade and custom items
          may have minor natural variations that make each piece one of a
          kind.
        </p>
        <p>
          Prices, availability, and product details are subject to change.
          Custom order quotes are valid for 14 days unless otherwise noted.
        </p>
        <p>
          All content, photography, and designs on this website belong to
          Necessary Treasures and may not be reproduced without permission.
        </p>
      </div>
    </div>
  );
}
