import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.5c0-.6.4-1 1-1h2V8Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/90">
      <div className="container-site py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream/70">
              Necessary Treasures is a husband-and-wife handmade studio crafting
              candles, leather goods, laser engravings, acrylic pieces, and
              custom creations — made by hand, made to mean something.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-cream/25 p-2.5 transition-colors hover:bg-cream/10"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-cream/25 p-2.5 transition-colors hover:bg-cream/10"
              >
                <FacebookIcon />
              </a>
              <a
                href="mailto:info@necessarytreasures.com"
                aria-label="Email"
                className="rounded-full border border-cream/25 p-2.5 transition-colors hover:bg-cream/10"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="section-eyebrow text-terracotta-light">Explore</h3>
            <ul className="mt-4 space-y-3 text-[0.92rem]">
              <li><Link className="text-cream/75 hover:text-cream" href="/shop">Shop</Link></li>
              <li><Link className="text-cream/75 hover:text-cream" href="/collections">Collections</Link></li>
              <li><Link className="text-cream/75 hover:text-cream" href="/gallery">Gallery</Link></li>
              <li><Link className="text-cream/75 hover:text-cream" href="/our-story">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="section-eyebrow text-terracotta-light">Help</h3>
            <ul className="mt-4 space-y-3 text-[0.92rem]">
              <li><Link className="text-cream/75 hover:text-cream" href="/contact">Contact</Link></li>
              <li><Link className="text-cream/75 hover:text-cream" href="/shipping-returns">Shipping &amp; Returns</Link></li>
              <li><Link className="text-cream/75 hover:text-cream" href="/faq">FAQ</Link></li>
              <li><Link className="text-cream/75 hover:text-cream" href="/custom-orders">Custom Orders</Link></li>
              <li><Link className="text-cream/75 hover:text-cream" href="/orders/lookup">Track an Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="section-eyebrow text-terracotta-light">Come see what we&rsquo;re making</h3>
            <p className="mt-4 text-[0.9rem] text-cream/70">
              New creations, custom pieces, and the occasional little treasure —
              delivered to your inbox.
            </p>
            <div className="mt-4">
              <NewsletterForm tone="light" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-7 text-xs text-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Necessary Treasures. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-cream">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream">Terms</Link>
            <Link href="/accessibility" className="hover:text-cream">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
