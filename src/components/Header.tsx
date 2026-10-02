"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/our-story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-cream/90 backdrop-blur-md shadow-[0_2px_24px_rgba(58,47,40,0.07)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-site flex h-20 items-center justify-between">
          <Link href="/" aria-label="Necessary Treasures home" className="z-10">
            <Logo tone={scrolled || !isHome ? "dark" : "light"} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`link-underline text-[0.92rem] font-medium transition-colors ${
                  scrolled || !isHome ? "text-charcoal" : "text-cream"
                } ${pathname === link.href ? "opacity-100" : "opacity-85 hover:opacity-100"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className={`rounded-full p-2.5 transition-colors hover:bg-black/5 ${
                scrolled || !isHome ? "text-charcoal" : "text-cream"
              }`}
            >
              <Search size={19} strokeWidth={1.75} />
            </button>
            <Link
              href="/orders/lookup"
              aria-label="Account and order lookup"
              className={`hidden rounded-full p-2.5 transition-colors hover:bg-black/5 sm:inline-flex ${
                scrolled || !isHome ? "text-charcoal" : "text-cream"
              }`}
            >
              <User size={19} strokeWidth={1.75} />
            </Link>
            <button
              type="button"
              aria-label={`Open cart, ${itemCount} items`}
              onClick={openCart}
              className={`relative rounded-full p-2.5 transition-colors hover:bg-black/5 ${
                scrolled || !isHome ? "text-charcoal" : "text-cream"
              }`}
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-cream">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className={`rounded-full p-2.5 transition-colors hover:bg-black/5 lg:hidden ${
                scrolled || !isHome ? "text-charcoal" : "text-cream"
              }`}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-cream px-7 py-7"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full p-2 text-charcoal hover:bg-black/5"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block border-b border-sand py-4 font-serif text-2xl italic text-charcoal"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link href="/orders/lookup" className="mt-8 text-sm font-medium text-charcoal-soft">
                Track an order
              </Link>
              <div className="mt-auto pt-10 text-sm text-charcoal-soft">
                Handmade with care, one treasure at a time.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-charcoal/50 px-5 pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.form
              onSubmit={submitSearch}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl rounded-2xl bg-cream p-3 shadow-2xl"
            >
              <div className="flex items-center gap-3 rounded-xl border border-sand-dark bg-white px-4 py-3.5">
                <Search size={19} className="text-taupe" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search candles, leather, engravings…"
                  className="w-full bg-transparent text-base text-charcoal outline-none placeholder:text-taupe"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="text-taupe hover:text-charcoal"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
