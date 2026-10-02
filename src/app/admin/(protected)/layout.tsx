export const dynamic = 'force-dynamic'

import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Studio Dashboard", robots: { index: false, follow: false } };

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
