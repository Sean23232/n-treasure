"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, LogOut, MessageSquareHeart, Package, ShoppingBag, Images } from "lucide-react";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/custom-orders", label: "Custom Requests", icon: MessageSquareHeart },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-sand-dark bg-white px-5 py-7 lg:flex">
          <Link href="/"><Logo /></Link>
          <nav className="mt-10 flex flex-col gap-1">
            {LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-terracotta/10 text-terracotta-dark" : "text-charcoal-soft hover:bg-sand/60"
                  }`}
                >
                  <link.icon size={17} /> {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={logout}
            className="mt-auto flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-charcoal-soft hover:bg-sand/60"
          >
            <LogOut size={17} /> Sign Out
          </button>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-sand-dark bg-white px-5 py-4 lg:hidden">
            <Logo />
            <button onClick={logout} className="text-sm font-medium text-charcoal-soft">Sign Out</button>
          </header>
          <nav className="flex gap-2 overflow-x-auto border-b border-sand-dark bg-white px-4 py-3 lg:hidden">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full bg-sand/60 px-3.5 py-1.5 text-xs font-medium text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <main className="px-5 py-8 sm:px-10 sm:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
