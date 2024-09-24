"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-background">
      <Sidebar />
      <div className="p-6 w-full">{children}</div>
    </section>
  );
}
