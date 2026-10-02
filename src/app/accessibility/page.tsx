export const metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <div className="container-site max-w-2xl pb-24 pt-32 sm:pt-36">
      <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] italic leading-tight text-charcoal">Accessibility</h1>
      <div className="mt-8 flex flex-col gap-5 leading-relaxed text-charcoal-soft">
        <p>
          We want Necessary Treasures to be usable by everyone. Our site is
          built with semantic HTML, keyboard-navigable menus and forms,
          visible focus states, descriptive alt text, and support for reduced
          motion preferences.
        </p>
        <p>
          If you encounter any barriers while using this site, please let us
          know at info@necessarytreasures.com and we&rsquo;ll do our best to
          fix it quickly.
        </p>
      </div>
    </div>
  );
}
