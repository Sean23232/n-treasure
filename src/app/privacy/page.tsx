export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-site max-w-2xl pb-24 pt-32 sm:pt-36">
      <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] italic leading-tight text-charcoal">Privacy Policy</h1>
      <div className="mt-8 flex flex-col gap-5 leading-relaxed text-charcoal-soft">
        <p>
          Necessary Treasures collects the information you provide directly
          to us — such as your name, email, shipping address, and order
          details — to process orders, respond to custom order requests, and
          send occasional newsletter updates if you opt in.
        </p>
        <p>
          We never sell your personal information. Information is used only
          to operate our shop, fulfill orders, and communicate with you about
          your purchases or inquiries.
        </p>
        <p>
          If you have any questions about how your information is handled,
          reach out any time at info@necessarytreasures.com.
        </p>
      </div>
    </div>
  );
}
